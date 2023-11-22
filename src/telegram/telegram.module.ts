import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from './telegram-config';
import { MessagesModule } from '../messages/messages.module';
import { UsersModule } from '../users/users.module';
import { Keyboard } from './keyboard-class';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { RequestsModule } from '../requests/requests.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync(options()),
    MessagesModule,
    UsersModule,
    RequestsModule,
    CacheModule.register({
      ttl: 30000,
      store: redisStore,
      host: 'localhost',
      port: 6320,
    }),
  ],
  providers: [TelegramService, Keyboard],
})
export class TelegramModule {}
