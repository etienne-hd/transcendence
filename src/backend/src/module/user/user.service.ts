import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser(id: String) {
    return {
      user_id: id,
    };
  }
}
