import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/auth.guard';
import { ZodValidationPipe } from 'src/common/validators/zod-validation.pipe';
import { type PutMeDto, PutMeSchema } from './dtos/put-me.dtos';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Get('/me')
  public async getUser(@Request() req) {
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
  @HttpCode(HttpStatus.OK)
  @Put('/me')
  public async putUser(
    @Request() req,
    @Body(new ZodValidationPipe(PutMeSchema)) body: PutMeDto,
  ) {
    return await this.userService.editUser(req.user.sub, body);
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Get('/user/:id')
  public async getUserById(@Param('id') id: number) {
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
