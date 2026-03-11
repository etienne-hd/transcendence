import { Module } from '@nestjs/common';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendEntity } from './friend.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [FriendController],
  providers: [FriendService, UserService, AuthService],
})
export class FriendModule {}
