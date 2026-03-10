import { Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/auth/register')
  postRegister(@Req() req: Request) {
    const body = req.body!;

    return this.authService.register(
      body['username'],
      body['password'],
      body['email'],
      body['name'],
    );
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('/auth/login')
  postLogin(@Req() req: Request) {
    const body = req.body!;

    return this.authService.login(body['username'], body['password']);
  }
}
