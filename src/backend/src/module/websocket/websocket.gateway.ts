import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Auth } from '../auth/auth.guard';

@WebSocketGateway(3002)
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() srv: Server;

  handleConnection(client: Socket): void {
    console.log("New client: ", client.id);
  }

  handleDisconnect(client: Socket): void {
    console.log("Client disconnection: ", client.id);
  }

  @Auth()
  @SubscribeMessage('ping')
  pong(client: Socket, msg: string): string {
    return "[pong] " + msg;
  }

  @Auth()
  @SubscribeMessage('msg')
  async msg(client: Socket, msg: string): Promise<string> {
    const sockets = await this.srv.fetchSockets();
    for (const socket of sockets) {
      const userID = socket.data?.user?.sub;

      if (userID === 1) { // replace by targetID
        socket.emit("msg", msg);
        return "msg sent";
      }
    }
    return "can't send to user";
  }
}
