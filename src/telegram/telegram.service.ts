import { Update, Ctx, Start, On, Message } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';
import {
  adminKeyboard,
  workerKeyboard,
  workerKeyboardCommands,
  adminKeyboardCommands,
} from './keyboard-config';
import { MessagesService } from '../messages/messages.service';
import { UsersService } from '../users/users.service';
import { BadRequestException } from '@nestjs/common';
import { Keyboard } from './keyboard-class';

type Context = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<Context> {
  constructor(
    private messageService: MessagesService,
    private userService: UsersService,
    private keyboard: Keyboard,
  ) {
    // @ts-ignore
    super();
  }
  @Start()
  async onStart(@Ctx() ctx: Context): Promise<void> {
    try {
      const user = await this.userService.findUser(ctx.from.id);

      if (!user) {
        const res = await this.userService.createUser({
          uuid: ctx.from.id,
          userName: ctx.from.username,
        });
        ctx.reply(
          `Привет ${ctx.from.username}! Твоя роль: ${res.role}`,
          res.role === 'ADMIN' ? adminKeyboard : workerKeyboard,
        );
      } else {
        ctx.reply(
          `Привет ${ctx.from.username}! Твоя роль: ${user.role}`,
          user.role === 'ADMIN' ? adminKeyboard : workerKeyboard,
        );
      }
    } catch (e) {
      throw new BadRequestException('Ошибка в /start');
    }
  }

  @On('text')
  async onSendMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    const user = await this.userService.findUser(ctx.from.id);
    if (user.role === 'WORKER') {
      if (message === workerKeyboardCommands.stats) {
        ctx.replyWithHTML(this.messageService.sendStats(2, 2));
      } else {
        ctx.reply(`${message} - Я не знаю такой команды`);
      }
    } else {
      if (message === adminKeyboardCommands.workers) {
        const workers = await this.userService.findAll();
        workers.forEach((worker) => {
          ctx.reply(`
          Username: ${worker.userName}
          `)
        })
      } else {
        ctx.reply(`${message} - Я не знаю такой команды`);
      }
    }
  }
}
