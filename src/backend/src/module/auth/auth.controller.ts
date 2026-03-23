import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  type PostRegisterDto,
  PostRegisterSchema,
} from './dtos/post-register.dtos';
import { type PostLoginDto, PostLoginSchema } from './dtos/post-login.dtos';
import { ZodValidationPipe } from '../../common/validators/zod-validation.pipe';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { ttl: 30000, limit: 2 } })
  @Post('/auth/register')
  public async postRegister(
    @Body(new ZodValidationPipe(PostRegisterSchema)) body: PostRegisterDto,
  ) {
    return this.authService.register(
      body.username,
      body.password,
      body.email,
      body.name,
    );
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Throttle({ default: { ttl: 30000, limit: 2 } })
  @Post('/auth/login')
  public async postLogin(
    @Body(new ZodValidationPipe(PostLoginSchema)) body: PostLoginDto,
  ) {
    return this.authService.login(body.username, body.password);
  }
}
