import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  Res,
  UploadedFile,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PassThrough } from 'node:stream';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Post('/messages')
  public async getMessages(
    @Request() req,
    @Body(new ZodValidationPipe(GetMessagesSchema)) body: GetMessagesDto,
    @Query('sort') sortType: string = 'asc',
    @Query('search') searchValue: string | null = null,
    @Query('attachment') attachmentOnly: boolean = false,
  ) {
    return await this.messageService.getMessages(
      req.user.sub,
      body.user_id,
      sortType,
      searchValue,
      attachmentOnly != false,
    );
  }

  @Auth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/messages/mark-read')
  public async PostMessagesMarkRead(
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
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  @Post('/message')
  public async postMessage(
    @Request() req,
    @Body(new ZodValidationPipe(PostMessageSchema)) body: PostMessageDto,
    @UploadedFile() attachment: Express.Multer.File,
  ) {
    return await this.messageService.sendMessage(
      req.user.sub,
      body.user_id,
      body.content,
      attachment,
    );
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Delete('/message')
  public async getUserById(
    @Request() req,
    @Body(new ZodValidationPipe(DeleteMessageSchema)) body: DeleteMessageDto,
  ) {
    return await this.messageService.DeleteMessage(
      req.user.sub,
      body.message_id,
    );
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Get('/message/:id/attachment')
  public async getMessageAttachment(@Request() req, @Param('id') id: number) {
    return await this.messageService.getMessageAttachment(req.user.sub, id);
  }
}
