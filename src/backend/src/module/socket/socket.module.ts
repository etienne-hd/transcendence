import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { WsAuthMiddleware } from './socket.auth';

@Module({
  providers: [SocketGateway, WsAuthMiddleware],
})
export class SocketModule {}
