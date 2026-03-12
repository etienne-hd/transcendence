import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
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
import { type GetMessagesDto, GetMessagesSchema } from './dtos/get-messages';
import { MessageService } from './message.service';
import {
  type PostMessagesMarkReadDto,
  PostMessagesMarkReadSchema,
} from './dtos/post-messages-mark-read.dtos';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Auth()
  @Get('/messages')
  async getMessages(
    @Request() req,
    @Body(new ZodValidationPipe(GetMessagesSchema)) body: GetMessagesDto,
  ) {
    return await this.messageService.getMessages(req.user.sub, body.user_id);
  }

  @Auth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/messages/mark-read')
  async PostMessagesMarkRead(
    @Request() req,
    @Body(new ZodValidationPipe(PostMessagesMarkReadSchema))
    body: PostMessagesMarkReadDto,
  ) {
    return await this.messageService.readAllMessages(
      body.user_id,
      req.user.sub,
    );
  }

  @Auth()
  @Post('/message')
  async postMessage(
    @Request() req,
    @Body(new ZodValidationPipe(PostMessageSchema)) body: PostMessageDto,
  ) {
    return await this.messageService.sendMessage(
      req.user.sub,
      body.user_id,
      body.content,
    );
  }

  @Auth()
  @Delete('/message')
  async getUserById(
    @Request() req,
    @Body(new ZodValidationPipe(DeleteMessageSchema)) body: DeleteMessageDto,
  ) {
    return await this.messageService.DeleteMessage(
      req.user.sub,
      body.message_id,
    );
  }
}
