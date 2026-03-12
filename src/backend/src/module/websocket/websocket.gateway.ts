import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Auth } from '../auth/auth.guard';

@WebSocketGateway(3002)
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() srv: Server;

  handleConnection(client: Socket): void {
    ;
  }

  handleDisconnect(client: Socket): void {
    ;
  }

  @Auth()
  @SubscribeMessage('msg')
  handleMessage(client: Socket, msg: any): void {
    this.srv.emit('stream', 'A client has sent message');
  }
}
