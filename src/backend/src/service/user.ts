import { Injectable } from '@nestjs/common';

@Injectable()
export class AppUserService {
	get_user(id: String) {
		return {"id": id};
	}
}