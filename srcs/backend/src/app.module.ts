import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppAuthService } from './service/auth';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppAuthService],
})
export class AppModule {}
