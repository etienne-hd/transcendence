import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { WsModule } from '../ws/ws.module';
import { FriendModule } from '../friend/friend.module';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
    WsModule,
    forwardRef(() => FriendModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
