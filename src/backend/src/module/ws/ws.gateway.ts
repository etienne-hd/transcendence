import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { WsAuthMiddleware } from './ws.auth';
import { FriendService } from '../friend/friend.service';
import { forwardRef, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';

@WebSocketGateway({
  transports: ['websocket'],
  cors: { origin: ['http://localhost:5173', 'https://unicord.fr'] },
})
export class WsGateway implements OnGatewayInit {
  constructor(
    private wsAuth: WsAuthMiddleware,
    @Inject(forwardRef(() => FriendService))
    private readonly friendService: FriendService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  @WebSocketServer() io: Server;

  public afterInit() {
    this.io.use((socket, next) => this.wsAuth.use(socket, next));
  }

  public async handleConnection(client: Socket) {
    const userId = client.data.user.sub;

    client.join(`user:${userId}`);

    // Notify all of his friends on online
    if (this.getRoomSize(`user:${userId}`) == 1) {
      const user = await this.userService.updateUserStatus(userId, 'online');
      const friends = await this.friendService.getFriends(userId);
      for (const friend of friends) {
        this.sendMessage(friend.user.id, 'friend:online', user);
      }
    }
  }

  public async handleDisconnect(client: Socket) {
    const userId = client.data.user.sub;

    // Notify all of his friends on offline
    if (this.getRoomSize(`user:${userId}`) == 0) {
      const user = await this.userService.updateUserStatus(userId, 'offline');
      const friends = await this.friendService.getFriends(userId);
      for (const friend of friends) {
        this.sendMessage(friend.user.id, 'friend:offline', user);
      }
    }
  }

  public sendMessage(userId: number, event: string, message: any) {
    this.io.to(`user:${userId}`).emit(event, message);
  }

  public getRoomSize(roomName: string) {
    const roomSockets = this.io.sockets.adapter.rooms.get(roomName);
    const size = roomSockets ? roomSockets.size : 0;
    return size;
  }
}
