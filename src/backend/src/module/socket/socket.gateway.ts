import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { WsAuthMiddleware } from './socket.auth';

@WebSocketGateway({ transports: ['websocket'], cors: '*' })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private wsAuth: WsAuthMiddleware) {}

  @WebSocketServer() io: Server;

  afterInit() {
    this.io.use((socket, next) => this.wsAuth.use(socket, next));
  }

  handleConnection(client: Socket) {
    console.log(`${client.id} connected`);
  }

  handleDisconnect(client: any) {
    console.log(`${client.id} disconnected`);
  }
}
