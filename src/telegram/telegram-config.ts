import { ConfigService } from '@nestjs/config';
import {
  TelegrafModuleAsyncOptions,
  TelegrafModuleOptions,
} from 'nestjs-telegraf';
import { session } from 'telegraf';

const telegrafOptions = (config: ConfigService): TelegrafModuleOptions => {
  return {
    token: config.get('TELEGRAM_API_KEY'),
    middlewares: [session()],
  };
};

export const options = (): TelegrafModuleAsyncOptions => {
  return {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => telegrafOptions(config),
  };
};
