import { Body, Controller, Get, Param, Put, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/auth.guard';
import { ZodValidationPipe } from 'src/common/validators/zod-validation.pipe';
import { type PutMeDto, PutMeSchema } from './dtos/put-me.dtos';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('/me')
  async getUser(@Request() req) {
    return await this.userService.getUser(req.user.sub, [
      'id',
      'username',
      'name',
      'biography',
      'avatar',
      'created_at',
      'last_seen_at',
      'email',
    ]);
  }

  @Auth()
  @Put('/me')
  async putUser(
    @Request() req,
    @Body(new ZodValidationPipe(PutMeSchema)) body: PutMeDto,
  ) {
    return await this.userService.editUser(req.user.sub, body);
  }

  @Auth()
  @Get('/user/:id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUser(id, [
      'id',
      'username',
      'name',
      'biography',
      'avatar',
      'created_at',
      'last_seen_at',
    ]);
  }
}
