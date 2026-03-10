import {
  BadRequestException,
  ConflictException,
  Injectable
} from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async register(
    username: string,
    password: string,
    email: string,
    name: string,
  ) {
    if (!username || !password || !email || !name) {
      throw new BadRequestException('Invalid body');
    }

    const isUsernameExist = await this.userRepository.findOneBy({
      username: username,
    });
    if (isUsernameExist) {
      throw new ConflictException('Username already exist');
    }

    const isEmailRegistered = await this.userRepository.findOneBy({
      email: email,
    });
    if (isEmailRegistered) {
      throw new ConflictException('Email already registered');
    }

    const user = this.userRepository.create({
      username,
      password,
      email,
      name,
    });
    this.userRepository.save(user);

    return { accessToken: 'test' };
  }
}
