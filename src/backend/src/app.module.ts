import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { FriendModule } from './module/friend/friend.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    FriendModule,

    ConfigModule.forRoot({ isGlobal: true }), // charge .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mariadb',
        host: '127.0.0.1',
        port: 3307,
        username: 'root',
        password: 'admin', //config.get('MYSQL_ROOT_PASSWORD'),
        database: 'unicord', //config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule {}
