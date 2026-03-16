import { forwardRef, Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { WsAuthMiddleware } from './ws.auth';
import { FriendModule } from '../friend/friend.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => FriendModule), forwardRef(() => UserModule)],
  providers: [WsGateway, WsAuthMiddleware],
  exports: [WsGateway],
})
export class WsModule {}
