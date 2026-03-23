import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  StreamableFile,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ILike, Not, IsNull, Repository, FindOptionsOrderValue } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { UserService } from '../user/user.service';
import { FriendService } from '../friend/friend.service';
import * as fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { extname, join } from 'node:path';
import { lookup } from 'mime-types';
import { WsGateway } from '../ws/ws.gateway';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly friendService: FriendService,
    private readonly wsService: WsGateway,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  public async getMessagesEntites(
    userIdA: number,
    userIdB: number,
    sortType: string,
    searchValue: string | null,
    attachmentOnly: boolean,
  ): Promise<MessageEntity[]> {
    const baseWhere = [
      { from_user: { id: userIdA }, to_user: { id: userIdB } },
      { from_user: { id: userIdB }, to_user: { id: userIdA } },
    ];

    if (searchValue) {
      for (const condition of baseWhere) {
        condition['content'] = ILike(`%${searchValue}%`);
      }
    }

    if (attachmentOnly) {
      for (const condition of baseWhere) {
        condition['attachment'] = Not(IsNull());
      }
    }

    return this.messageRepository.find({
      where: baseWhere,
      order: { created_at: sortType as FindOptionsOrderValue },
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

  public async getMessages(
    userIdA: number,
    userIdB: number,
    sortType: string,
    searchValue: string | null,
    attachmentOnly: boolean,
  ) {
    if (!(sortType == 'asc' || sortType == 'desc')) {
      throw new BadRequestException('Invalid sort type!');
    }

    const messages = await this.getMessagesEntites(
      userIdA,
      userIdB,
      sortType,
      searchValue,
      attachmentOnly,
    );

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

  public async checkContentModerationAI(content: string): Promise<boolean> {
    const apiKey = this.configService.get('GEMINI_API_KEY');

    if (apiKey == '' || apiKey == null) return false;

    const response = await firstValueFrom(
      this.httpService.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemma-3n-e2b-it:generateContent',
        {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: 'You are a moderation AI. Analyze the given content and return a score between 0 and 100, where: 0 means the content is completely safe 100 means the content is extremely inappropriate or contains offensive/bad words Respond ONLY with the number (no explanation, no text)',
                },
              ],
            },
            {
              role: 'model',
              parts: [
                {
                  text: 'right! send me the text to moderate.',
                },
              ],
            },
            {
              role: 'user',
              parts: [
                {
                  text: content,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey,
          },
          validateStatus: (status) => true,
        },
      ),
    );

    if (response.status != 200) {
      return false;
    }

    const result = response.data.candidates[0].content.parts[0].text;
    const match = result.match(/\d+/);
    const value = (match ? match[0] : 0) as number;

    return value > 80;
  }

  public async sendMessage(
    from_user_id: number,
    to_user_id: number,
    content: string | undefined,
    attachmentFile: Express.Multer.File | undefined,
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

    if (content && (await this.checkContentModerationAI(content))) {
      from_user.warn += 1;
      await this.userRepository.save(from_user);

      throw new UnprocessableEntityException(
        'Message rejected by AI moderation.',
      );
    }

    var attachment: string | null = null;
    if (attachmentFile) {
      // Upload attachment to ./uploads/attachments
      const uniqueSuffix = randomUUID();
      const ext = extname(attachmentFile.originalname);
      const path = `./uploads/attachments/${uniqueSuffix}${ext}`;
      await fs.promises.writeFile(path, attachmentFile.buffer);
      attachment = `${uniqueSuffix}${ext}`;
    }

    var message = this.messageRepository.create({
      from_user,
      to_user,
      content,
      attachment,
    });
    await this.messageRepository.save(message);
    this.wsService.sendMessage(
      to_user.id,
      'message:new',
      this.userService.formatUserData(from_user),
    );
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
        // Delete attachment
        if (
          result.attachment &&
          fs.existsSync(`./uploads/attachments/${result.attachment}`)
        ) {
          fs.unlinkSync(`./uploads/attachments/${result.attachment}`);
        }

        await this.messageRepository.remove(result);
        this.wsService.sendMessage(
          result.to_user.id,
          'message:delete',
          this.userService.formatUserData(result.from_user),
        );
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

  public async getMessageAttachment(userId: number, messageId: number) {
    const result = await this.messageRepository.findOne({
      where: { id: messageId },
    });

    if (!result) {
      throw new NotFoundException('Message not found');
    }

    if (!(result.from_user.id == userId || result.to_user.id == userId)) {
      throw new UnauthorizedException(
        "You're not allowed to see this attachment!",
      );
    }

    if (result.attachment == null) {
      throw new NotFoundException('Attachment not found');
    }

    const attachmentPath = join(
      process.cwd(),
      'uploads',
      'attachments',
      result.attachment,
    );

    if (!fs.existsSync(attachmentPath)) {
      throw new NotFoundException('Attachment not found');
    }

    const mimeType = lookup(attachmentPath) || 'application/octet-stream';

    const file = fs.createReadStream(attachmentPath);

    const fileStats = fs.statSync(attachmentPath);

    return new StreamableFile(file, {
      type: mimeType,
      disposition: `attachment; filename="${result.attachment}"`,
      length: fileStats.size,
    });
  }
}
