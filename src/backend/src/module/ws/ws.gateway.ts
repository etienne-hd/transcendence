import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { WsAuthMiddleware } from './ws.auth';

@WebSocketGateway({ transports: ['websocket'], cors: '*' })
export class WsGateway implements OnGatewayInit {
  constructor(private wsAuth: WsAuthMiddleware) {}

  @WebSocketServer() io: Server;

  public afterInit() {
    this.io.use((socket, next) => this.wsAuth.use(socket, next));
  }

  handleConnection(client: Socket) {
    client.join(`user:${client.data.user.sub}`);
  }

  public sendMessage(userId: number, event: string, message: any) {
    this.io.to(`user:${userId}`).emit(event, message);
  }
}
