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
import { ZodValidationPipe } from 'src/common/validators/zod-validation.pipe';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
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
  @Post('/auth/login')
  public async postLogin(
    @Body(new ZodValidationPipe(PostLoginSchema)) body: PostLoginDto,
  ) {
    return this.authService.login(body.username, body.password);
  }
}
