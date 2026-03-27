import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuthMiddleware {
  constructor(private jwtService: JwtService) {}

  public async use(socket: Socket, next: (err?: any) => void) {
    try {
      const token =
        socket.handshake.auth?.token || this.extractTokenFromHeader(socket);
      if (!token) throw new UnauthorizedException();

      const payload = this.jwtService.verify(token);
      socket.data.user = payload;
      next();
    } catch (err) {
      next(new UnauthorizedException());
    }
  }

  private extractTokenFromHeader(request: Socket): string | undefined {
    const [type, token] =
      request.handshake.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
