import { BadRequestException, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
