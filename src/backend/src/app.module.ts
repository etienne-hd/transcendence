import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { FriendModule } from './module/friend/friend.module';
import { MessageModule } from './module/message/message.module';
import { WsModule } from './module/ws/ws.module';

@Module({
  imports: [
    PrometheusModule.register(),
    AuthModule,
    UserModule,
    FriendModule,
    MessageModule,
    WsModule,

    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mariadb',
        host: config.get('MYSQL_HOST', '127.0.0.1'),
        port: 3306,
        username: 'root',
        password: config.get('MYSQL_ROOT_PASSWORD', 'admin'),
        database: config.get('DB_NAME', 'unicord'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule {}
