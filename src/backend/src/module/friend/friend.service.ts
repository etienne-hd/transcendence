import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendEntity } from './friend.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendEntity)
    private readonly friendRepository: Repository<FriendEntity>,
    private readonly userService: UserService,
  ) {}

  public async getFriendsEntites(userId: number): Promise<FriendEntity[]> {
    const friends: FriendEntity[] = await this.friendRepository
      .createQueryBuilder('f')
      .leftJoinAndSelect('f.user', 'user')
      .leftJoinAndSelect('f.friend', 'friend')
      .where('(f.user_id = :userId OR f.friend_id = :userId)', {
        userId,
      })
      .getMany();

    return friends;
  }

  public async getFriends(userId: number) {
    const friends = await this.getFriendsEntites(userId);

    return friends.map((friend) => {
      const isSender = friend.user.id === userId;
      const userFriend = isSender ? friend.friend : friend.user;
      const status =
        isSender && friend.status === 'pending' ? 'sent' : friend.status;

      return {
        id: friend.id,
        user: {
          id: userFriend.id,
          username: userFriend.username,
          name: userFriend.name,
          biography: userFriend.biography,
          avatar: userFriend.avatar,
          created_at: userFriend.created_at,
          last_seen_at: userFriend.last_seen_at,
        },
        status,
        created_at: friend.created_at,
        friend_at: friend.friend_at,
      };
    });
  }

  public async addFriend(userId: number, username: string) {
    const user = await this.userService.getUserEntity({ id: userId });
    const targetUser = await this.userService.getUserEntity({ username });

    if (user.id == targetUser.id) {
      throw new ConflictException('You cannot add yourself as a friend.');
    }

    for (const friend of await this.getFriendsEntites(userId)) {
      if (
        friend.user.id == targetUser.id ||
        friend.friend.id == targetUser.id
      ) {
        if (friend.status == 'pending') {
          if (friend.user.id == targetUser.id) {
            // Accept Friend
            friend.status = 'friend';
            friend.friend_at = new Date();
            await this.friendRepository.save(friend);
            return {
              message: 'You have successfully accepted the friend request!',
            };
          } else {
            throw new ConflictException(
              'You have already sent a request to this user!',
            );
          }
        } else {
          throw new ConflictException(
            'You are already friends with this user!',
          );
        }
      }
    }

    // Create friend in database
    const friend = this.friendRepository.create({
      user,
      friend: targetUser,
      status: 'pending',
    });
    await this.friendRepository.save(friend);
    return { message: 'Friend request successfully sent!' };
  }

  public async removeFriend(userId: number, username: string) {
    const targetUser = await this.userService.getUserEntity({ username });

    for (const friend of await this.getFriendsEntites(userId)) {
      if (
        friend.user.id == targetUser.id ||
        friend.friend.id == targetUser.id
      ) {
        await this.friendRepository.remove(friend);
        return { message: 'Friend successfully removed!' };
      }
    }

    throw new NotFoundException('You are not friends with this user!');
  }
}
