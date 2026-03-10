import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getUser(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({
      id: id,
    });

    if (!user) {
      throw new NotFoundException('Unable to find user');
    }

    return user;
  }

  public async editUser(id: number, fields: JSON): Promise<UserEntity> {
    const editableFields = [
      'username',
      'email',
      'name',
      'biography',
      'password',
      'avatar',
    ];

    const user = await this.getUser(id);

    for (const field in fields) {
      if (editableFields.includes(field)) {
        user[field] = fields[field];
      }
    }

    await this.userRepository.save(user);

    return user;
  }
}
