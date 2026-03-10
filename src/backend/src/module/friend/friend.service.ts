import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendService {
  getFriend(id: String) {
    return {
      user_id: id,
    };
  }
}
