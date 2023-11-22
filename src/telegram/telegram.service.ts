import { Update, Ctx, Start, On, Message } from 'nestjs-telegraf';
import { Markup, Telegraf } from 'telegraf';
import {
  adminKeyboard,
  workerKeyboard,
  workerKeyboardCommands,
  adminKeyboardCommands,
} from './keyboard-config';
import { MessagesService } from '../messages/messages.service';
import { UsersService } from '../users/users.service';
import { BadRequestException, Inject } from '@nestjs/common';
import { Keyboard } from './keyboard-class';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Context } from './context.interface';
import { RequestsService } from '../requests/requests.service';

@Update()
export class TelegramService extends Telegraf<Context> {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private messageService: MessagesService,
    private userService: UsersService,
    private requestService: RequestsService,
    private keyboard: Keyboard,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super();
  }
  @Start()
  async onStart(@Ctx() ctx: Context): Promise<void> {
    try {
      const user = await this.userService.findUser(ctx.from.id);
      if (user) await this.cacheManager.set('user', user);
      if (!user) {
        const res = await this.userService.createUser({
          uuid: ctx.from.id,
          userName: ctx.from.username,
        });
        await this.cacheManager.set('user', res);
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

  // @Hears(adminKeyboardCommands.addRequest)
  // async addRequest(@Ctx() ctx: Context) {
  //
  //   ctx.session.type = 'done';
  // }

  @On('text')
  async onSendMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    const user = await this.userService.findUser(ctx.from.id);

    if (user.role === 'WORKER') {
      if (message === workerKeyboardCommands.stats) {
        await ctx.replyWithHTML(this.messageService.sendStats(2, 2));
      } else if (message === workerKeyboardCommands.currentRequests) {
        const requests = await this.requestService.getRequests();
        requests.forEach((request) => {
          ctx.replyWithHTML(
            `<b>Заявка</b>: ${request.title}`,
            Markup.inlineKeyboard([
              [{ text: 'Взять заявку', callback_data: request.id.toString() }],
            ]),
          );
        });
      } else if (message === workerKeyboardCommands.currentWorkerRequests) {
        const requests = await this.requestService.getCurrentWorkerRequests(
          user.id,
        );
        if (requests.length === 0) {
          ctx.reply('В данный момент у Вас нет активных заявок');
          return;
        }
        requests.forEach((request) => {
          ctx.replyWithHTML(
            `Заявка <b>${request.title}</b> в процессе выполниения 🎯`,
          );
        });
      } else {
        ctx.reply(`${message} - Я не знаю такой команды`);
      }
    } else {
      if (message === adminKeyboardCommands.workers) {
        const workers = await this.userService.findAll();
        workers.forEach((worker) => {
          ctx.reply(`
          Username: ${worker.userName}
          `);
        });
      } else if (adminKeyboardCommands.addRequest) {
        // const res = await this.requestService.createRequest(
        //   {
        //     title: message,
        //     createdById: user.id,
        //   },
        //   user.id,
        // );
        // if (res) {
        //   ctx.replyWithHTML(`<b>Заявка:</b> '${message}' - успешно создана ✅`);
        // } else {
        //   ctx.replyWithHTML(
        //     `<b>Заявка:</b> '${message}' - не удалось создать заявку ❌`,
        //   );
        // }
      } else {
        ctx.reply(`${message} - Я не знаю такой команды`);
      }
    }
  }

  @On('callback_query')
  async editKeyboard(@Ctx() ctx: Context) {
    await ctx.editMessageText(
      'Заявка успешно взята, номер телефона: +786875765',
    );
    if ('data' in ctx.callbackQuery) {
      const requestId = Number(ctx.callbackQuery.data);
      const uuid = ctx.callbackQuery.from.id;
      await this.requestService.updateRequest(requestId, uuid);
    }
  }
}
