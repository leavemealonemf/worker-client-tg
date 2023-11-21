import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import {TelegrafModule} from "nestjs-telegraf";
import {options} from "./telegram-config";
import {MessagesModule} from "../messages/messages.module";
import {UsersModule} from "../users/users.module";
import {Keyboard} from "./keyboard-class";

@Module({
  imports: [TelegrafModule.forRootAsync(options()), MessagesModule, UsersModule],
  providers: [TelegramService, Keyboard],
})
export class TelegramModule {}
