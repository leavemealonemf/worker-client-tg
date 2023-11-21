import { Markup } from 'telegraf';

export interface KeyboardInterface {
  keyboard: Markup.Markup<any>;
  getKeyboard: (role: string) => void;
}
