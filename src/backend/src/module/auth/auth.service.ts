import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  public async getJWT(user_id: number): Promise<string> {
    const payload = { sub: user_id };

    return await this.jwtService.signAsync(payload);
  }

  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

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

    const hashedPassword = await this.hashPassword(password);
    var user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      name,
    });
    await this.userRepository.save(user);

    return { accessToken: await this.getJWT(user.id) };
  }

  public async login(username: string, password: string) {
    const user = await this.userRepository.findOneBy({
      username: username,
    });
    if (!user) {
      throw new NotFoundException('Username does not exist!');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password!');
    }

    return { accessToken: await this.getJWT(user.id) };
  }
}
