import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PutMeDto } from './dtos/put-me.dtos';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
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

  public async getUser(id: number, fields: string[]) {
    const user = await this.getUserEntity({ id });
    var values = {};
    for (const field in user) {
      if (fields.includes(field)) {
        values[field] = user[field];
      }
    }
    return values;
  }

  public async editUser(id: number, fields: PutMeDto) {
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

    for (const field in fields) {
      if (editableFields.includes(field)) {
        if (field == 'password') {
          fields[field] = await this.authService.hashPassword(fields[field]!);
        }
        user[field] = fields[field];
      }
    }

    await this.userRepository.save(user);

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
