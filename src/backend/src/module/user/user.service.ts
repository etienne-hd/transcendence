import {
  ConflictException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import * as fs from 'node:fs';
import { join } from 'node:path';
import { lookup } from 'mime-types';
import { WsGateway } from '../ws/ws.gateway';
import { FriendService } from '../friend/friend.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
    private readonly friendService: FriendService,
    private readonly wsService: WsGateway,
  ) {}

  public async getUserEntity(params: {
    id?: number;
    username?: string;
  }): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy(params);

    if (!user) {
      throw new NotFoundException('Unable to find user');
    }

    return user;
  }

  public formatUserData(
    user: UserEntity,
    fields: string[] = [
      'id',
      'username',
      'name',
      'biography',
      'avatar',
      'created_at',
      'last_seen_at',
    ],
  ) {
    var values = {};
    for (const field in user) {
      if (fields.includes(field)) {
        values[field] = user[field];
      }
    }
    return values;
  }

  public async getUser(id: number, fields: string[]) {
    const user = await this.getUserEntity({ id });
    return this.formatUserData(user, fields);
  }

  public async getUserAvatar(id: number) {
    const user = await this.getUserEntity({ id });
    const avatarPath = join(
      process.cwd(),
      'uploads',
      'avatars',
      user.avatar || 'default.png',
    );

    if (!fs.existsSync(avatarPath)) {
      throw new NotFoundException('Unable to retrieve avatar.');
    }

    const mimeType = lookup(avatarPath) || 'application/octet-stream';

    const file = fs.createReadStream(avatarPath);
    return new StreamableFile(file, { type: mimeType });
  }

  public async editUser(id: number, fields, avatarFile: Express.Multer.File) {
    const editableFields = [
      'username',
      'email',
      'name',
      'biography',
      'password',
    ];

    const user = await this.getUserEntity({ id });

    if (fields.username && user.username != fields.username) {
      const isUsernameExist = await this.userRepository.findOneBy({
        username: fields.username,
      });
      if (isUsernameExist) {
        throw new ConflictException('Username already taken!');
      }
    }

    if (fields.email && user.email != fields.email) {
      const isEmailExist = await this.userRepository.findOneBy({
        email: fields.email,
      });
      if (isEmailExist) {
        throw new ConflictException(
          'This email is already associated with a user!',
        );
      }
    }

    if (
      (avatarFile || fields.avatar == 'default') &&
      user.avatar &&
      fs.existsSync(`./uploads/avatars/${user.avatar}`)
    ) {
      fs.unlinkSync(`./uploads/avatars/${user.avatar}`);
    }

    if (avatarFile) {
      // Upload avatar to ./uploads/avatars
      const uniqueSuffix = randomUUID();
      const ext = extname(avatarFile.originalname);
      const path = `./uploads/avatars/${uniqueSuffix}${ext}`;
      await fs.promises.writeFile(path, avatarFile.buffer);
      user.avatar = `${uniqueSuffix}${ext}`;
    } else if (fields.avatar == 'default') {
      user.avatar = null;
    }

    for (const field in fields) {
      if (editableFields.includes(field)) {
        if (field == 'password') {
          fields[field] = await this.authService.hashPassword(fields[field]!);
        }
        user[field] = fields[field];
      }
    }

    await this.userRepository.save(user);

    // Notify all of his friends
    const friends = await this.friendService.getFriends(user.id);
    for (const friend of friends) {
      this.wsService.sendMessage(
        friend.user.id,
        'friend:update',
        this.formatUserData(user),
      );
    }

    return {
      id: user.id,
      username: user.username,
      name: user.name,
      biography: user.biography,
      avatar: user.avatar,
      created_at: user.created_at,
      last_seen_at: user.last_seen_at,
      email: user.email,
    };
  }
}
