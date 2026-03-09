import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppUserService } from './service/user';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppUserService],
})
export class AppModule {}
