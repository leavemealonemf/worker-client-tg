import { ConfigService } from '@nestjs/config';
import {
  TelegrafModuleAsyncOptions,
  TelegrafModuleOptions,
} from 'nestjs-telegraf';

const telegrafOptions = (config: ConfigService): TelegrafModuleOptions => {
  return {
    token: config.get('TELEGRAM_API_KEY'),
  };
};

export const options = (): TelegrafModuleAsyncOptions => {
  return {
    inject: [ConfigService],
    useFactory: (config: ConfigService) => telegrafOptions(config),
  };
};
