import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './messages/messages.module';
import {PrismaService} from "./database/database.service";
import { UsersModule } from './users/users.module';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TelegramModule, MessagesModule, UsersModule, RequestsModule],
  providers: [PrismaService],
})
export class AppModule {}
