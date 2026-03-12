import { Module } from '@nestjs/common';
import { UserController } from './message.controller';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { MessageService } from './message.service';
import { MessageEntity } from './message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([MessageEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, MessageService],
})
export class UserModule {}
