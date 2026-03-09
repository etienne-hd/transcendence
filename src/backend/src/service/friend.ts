import { Injectable } from '@nestjs/common';
import { AppUserService } from './user';

@Injectable()
export class AppFriendService {
	constructor(private readonly userService: AppUserService) {}

	get_friends(id: String) {
		// SQL Request to get all friends request

		this.userService.get_user(id)
		return [
			{
				"id": 1,
				"user"
			},
			{
				"id": 2
			}
		];
	}
}