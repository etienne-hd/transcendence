import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { MessageService } from './message.service';
import { MessageEntity } from './message.entity';
import { MessageController } from './message.controller';
import { FriendEntity } from '../friend/friend.entity';
import { FriendModule } from '../friend/friend.module';
import { UserModule } from '../user/user.module';
import { WsModule } from '../ws/ws.module';
import { AuthModule } from '../auth/auth.module';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([MessageEntity]),
    TypeOrmModule.forFeature([FriendEntity]),
    FriendModule,
    UserModule,
    AuthModule,
    WsModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
