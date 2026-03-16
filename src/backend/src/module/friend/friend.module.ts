import { forwardRef, Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendEntity } from './friend.entity';
import { UserEntity } from '../user/user.entity';
import { MessageEntity } from '../message/message.entity';
import { UserModule } from '../user/user.module';
import { WsModule } from '../ws/ws.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendEntity, UserEntity, MessageEntity]),
    forwardRef(() => UserModule),
    AuthModule,
    forwardRef(() => WsModule),
  ],
  controllers: [FriendController],
  providers: [FriendService],
  exports: [FriendService],
})
export class FriendModule {}
