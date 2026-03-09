import { Injectable } from '@nestjs/common';

@Injectable()
export class AppAuthService {
	//login(): JSON {
	//	return {"a": 123};
	//}

	register(): string {
		return 'Hello UniCord!';
	}
}