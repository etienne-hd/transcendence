import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { MessageService } from './message.service';
import { MessageEntity } from './message.entity';
import { MessageController } from './message.controller';
import { AuthService } from '../auth/auth.service';
import { FriendService } from '../friend/friend.service';
import { FriendEntity } from '../friend/friend.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([MessageEntity]),
    TypeOrmModule.forFeature([FriendEntity]),
  ],
  controllers: [MessageController],
  providers: [FriendService, UserService, MessageService, AuthService],
})
export class MessageModule {}
