import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf';
import { KeyboardInterface } from './keyboard.interface';
import { workerKeyboardBtns } from './keyboard-config';

@Injectable()
export class Keyboard implements KeyboardInterface {
  keyboard: Markup.Markup<any>;

  getKeyboard(role: string): void {
    if (role === 'WORKER') {
      this.keyboard = Markup.keyboard(workerKeyboardBtns);
    }
  }
}
