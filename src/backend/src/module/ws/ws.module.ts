import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import { WsAuthMiddleware } from './ws.auth';

@Module({
  providers: [WsGateway, WsAuthMiddleware],
  exports: [WsGateway],
})
export class SocketModule {}
