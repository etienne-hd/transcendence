import { Controller, Get, Param, Put, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('/me')
  async getUser(@Request() req) {
    const user = await this.userService.getUser(req.user.id);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      biography: user.biography,
      avatar: user.avatar,
      created_at: user.created_at,
      last_seen_at: user.last_seen_at,
    };
  }

  @Auth()
  @Put('/me')
  putUser(@Request() req) {
    return this.userService.editUser(req.user.id, req.body);
  }

  @Auth()
  @Get('/user/:id')
  async getUserById(@Param('id') id: number) {
    const user = await this.userService.getUser(id);
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      biography: user.biography,
      avatar: user.avatar,
      created_at: user.created_at,
      last_seen_at: user.last_seen_at,
    };
  }
}
