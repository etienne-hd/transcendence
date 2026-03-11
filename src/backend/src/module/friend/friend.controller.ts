import {
  Body,
  Controller,
  Delete,
  Get,
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
} from './dtos/delete-friend.dtos copy';

@Controller()
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Auth()
  @Get('/friends')
  async getFriends(@Request() req) {
    const friends = await this.friendService.getFriends(req.user.sub);

    return friends.map((friend) => {
      const isSender = friend.user.id === req.user.sub;
      const userFriend = isSender ? friend.friend : friend.user;
      const status =
        isSender && friend.status === 'pending' ? 'sent' : friend.status;

      return {
        id: friend.id,
        user: {
          id: userFriend.id,
          username: userFriend.username,
          name: userFriend.name,
          biography: userFriend.biography,
          avatar: userFriend.avatar,
          created_at: userFriend.created_at,
          last_seen_at: userFriend.last_seen_at,
        },
        status,
        created_at: friend.created_at,
        friend_at: friend.friend_at,
      };
    });
  }

  @Auth()
  @Post('/friend')
  async postFriend(
    @Request() req,
    @Body(new ZodValidationPipe(PostFriendSchema)) body: PostFriendDto,
  ) {
    const friend = await this.friendService.addFriend(
      req.user.sub,
      body.username,
    );
    const isSender = friend.user.id === req.user.sub;
    const userFriend = isSender ? friend.friend : friend.user;
    const status =
      isSender && friend.status === 'pending' ? 'sent' : friend.status;

    return {
      id: friend.id,
      user: {
        id: userFriend.id,
        username: userFriend.username,
        name: userFriend.name,
        biography: userFriend.biography,
        avatar: userFriend.avatar,
        created_at: userFriend.created_at,
        last_seen_at: userFriend.last_seen_at,
      },
      status,
      created_at: friend.created_at,
      friend_at: friend.friend_at,
    };
  }

  @Auth()
  @Delete('/friend')
  async deleteFriend(
    @Request() req,
    @Body(new ZodValidationPipe(DeleteFriendSchema)) body: DeleteFriendDto,
  ) {
    return await this.friendService.removeFriend(req.user.sub, body.username);
  }
}
