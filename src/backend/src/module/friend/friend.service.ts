import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendEntity } from './friend.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendEntity)
    private readonly friendRepository: Repository<FriendEntity>,
    private readonly userService: UserService,
  ) {}

  async getFriends(userId: number): Promise<FriendEntity[]> {
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

  async addFriend(userId: number, username: string): Promise<FriendEntity> {
    const user = await this.userService.getUser({ id: userId });
    const targetUser = await this.userService.getUser({ username });

    if (user.id == targetUser.id) {
      throw new ConflictException('Cannot add yourself as a friend.');
    }

    for (const friend of await this.getFriends(userId)) {
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
            return friend;
          } else {
            throw new ConflictException(
              "You've already sent a request to this user!",
            );
          }
        } else {
          throw new ConflictException("You're already friend!");
        }
      }
    }

    const friend = this.friendRepository.create({
      user,
      friend: targetUser,
      status: 'pending',
    });
    await this.friendRepository.save(friend);
    return friend;
  }

  async removeFriend(userId: number, username: string) {
    const targetUser = await this.userService.getUser({ username });

    for (const friend of await this.getFriends(userId)) {
      if (
        friend.user.id == targetUser.id ||
        friend.friend.id == targetUser.id
      ) {
        await this.friendRepository.remove(friend);
        return;
      }
    }

    throw new NotFoundException("You're not friends with this user!");
  }
}
