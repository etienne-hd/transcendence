import { Body, Controller, Delete, Get, Post, Request } from '@nestjs/common';
import { Auth } from '../auth/auth.guard';
import { ZodValidationPipe } from 'src/common/validators/zod-validation.pipe';
import {
  type PostMessageDto,
  PostMessageSchema,
} from './dtos/post-message.dtos';
import {
  type DeleteMessageDto,
  DeleteMessageSchema,
} from './dtos/delete-message.dtos';

@Controller()
export class UserController {
  @Auth()
  @Get('/messages')
  async getMessages(@Request() req) {}

  @Auth()
  @Post('/message')
  async postMessage(
    @Request() req,
    @Body(new ZodValidationPipe(PostMessageSchema)) body: PostMessageDto,
  ) {}

  @Auth()
  @Delete('/message')
  async getUserById(
    @Request() req,
    @Body(new ZodValidationPipe(DeleteMessageSchema)) body: DeleteMessageDto,
  ) {}
}
