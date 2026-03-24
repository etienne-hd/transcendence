import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  forwardRef,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Authorization
    if (request.headers.authorization) {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(token);
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
    }
    // API Key
    else if (request.headers['x-api-key']) {
      const user = await this.userRepository.findOne({
        where: {
          api_key: request.headers['x-api-key'],
        },
      });

      if (!user) throw new UnauthorizedException();
      request['user'] = user.id;
    } else {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

export const Auth = () => applyDecorators(UseGuards(AuthGuard));
