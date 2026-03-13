import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { Auth } from '../auth/auth.guard';
import { ZodValidationPipe } from 'src/common/validators/zod-validation.pipe';
import { type PostFriendDto, PostFriendSchema } from './dtos/post-friend.dtos';
import {
  type DeleteFriendDto,
  DeleteFriendSchema,
} from './dtos/delete-friend.dtos';

@Controller()
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Get('/friends')
  public async getFriends(@Request() req) {
    return await this.friendService.getFriends(req.user.sub);
  }

  @Auth()
  @HttpCode(HttpStatus.CREATED)
  @Post('/friend')
  public async postFriend(
    @Request() req,
    @Body(new ZodValidationPipe(PostFriendSchema)) body: PostFriendDto,
  ) {
    return await this.friendService.addFriend(req.user.sub, body.username);
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Delete('/friend')
  public async deleteFriend(
    @Request() req,
    @Body(new ZodValidationPipe(DeleteFriendSchema)) body: DeleteFriendDto,
  ) {
    return await this.friendService.removeFriend(req.user.sub, body.username);
  }
}
