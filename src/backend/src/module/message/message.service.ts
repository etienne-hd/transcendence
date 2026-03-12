import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { UserService } from '../user/user.service';
import { FriendService } from '../friend/friend.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    private readonly userService: UserService,
    private readonly friendService: FriendService,
  ) {}
  public async getMessagesEntites(
    userIdA: number,
    userIdB: number,
  ): Promise<MessageEntity[]> {
    return this.messageRepository.find({
      where: [
        { from_user: { id: userIdA }, to_user: { id: userIdB } },
        { from_user: { id: userIdB }, to_user: { id: userIdA } },
      ],
      order: { created_at: 'ASC' },
    });
  }

  public async readAllMessages(from_user: number, to_user: number) {
    await this.messageRepository.update(
      {
        from_user: { id: from_user },
        to_user: { id: to_user },
        read_at: IsNull(),
      },
      {
        read_at: new Date(),
      },
    );
  }

  public async getMessages(userIdA: number, userIdB: number) {
    const messages = await this.getMessagesEntites(userIdA, userIdB);

    return messages.map((message) => {
      return {
        id: message.id,
        from_user: {
          id: message.from_user.id,
          username: message.from_user.username,
          name: message.from_user.name,
          biography: message.from_user.biography,
          avatar: message.from_user.avatar,
          created_at: message.from_user.created_at,
          last_seen_at: message.from_user.last_seen_at,
        },
        to_user: {
          id: message.to_user.id,
          username: message.to_user.username,
          name: message.to_user.name,
          biography: message.to_user.biography,
          avatar: message.to_user.avatar,
          created_at: message.to_user.created_at,
          last_seen_at: message.to_user.last_seen_at,
        },
        created_at: message.created_at,
        content: message.content,
        attachment: message.attachment,
      };
    });
  }

  public async sendMessage(
    from_user_id: number,
    to_user_id: number,
    content: string | undefined,
  ) {
    if (from_user_id == to_user_id) {
      throw new ConflictException('You cannot send a message to yourself.');
    }

    const from_user = await this.userService.getUserEntity({
      id: from_user_id,
    });
    const to_user = await this.userService.getUserEntity({ id: to_user_id });
    if (
      (await this.friendService.areFriends(from_user.id, to_user.id)) == false
    ) {
      throw new ForbiddenException(
        'You cannot send a message to this user, you are not friends with them!',
      );
    }
    var message = this.messageRepository.create({
      from_user,
      to_user,
      content,
    });
    await this.messageRepository.save(message);
    return {
      id: message.id,
      from_user: {
        id: message.from_user.id,
        username: message.from_user.username,
        name: message.from_user.name,
        biography: message.from_user.biography,
        avatar: message.from_user.avatar,
        created_at: message.from_user.created_at,
        last_seen_at: message.from_user.last_seen_at,
      },
      to_user: {
        id: message.to_user.id,
        username: message.to_user.username,
        name: message.to_user.name,
        biography: message.to_user.biography,
        avatar: message.to_user.avatar,
        created_at: message.to_user.created_at,
        last_seen_at: message.to_user.last_seen_at,
      },
      created_at: message.created_at,
      content: message.content,
      attachment: message.attachment,
    };
  }

  public async DeleteMessage(userId: number, messageId: number) {
    const result = await this.messageRepository.findOne({
      where: { id: messageId },
    });

    if (result) {
      if (result.from_user.id == userId) {
        await this.messageRepository.remove(result);
        return { message: 'Message successfully deleted!' };
      } else {
        throw new ForbiddenException(
          "You can't delete a message that is not yours",
        );
      }
    } else {
      throw new NotFoundException('Message not found');
    }
  }
}
