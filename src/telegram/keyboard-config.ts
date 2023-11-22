import { Markup } from 'telegraf';

export enum workerKeyboardCommands {
  currentRequests = 'Текущие заявки',
  currentWorkerRequests = 'Мои заявки',
  completedRequests = 'Завершенные заявки',
  stats = 'Статистика',
}

export enum adminKeyboardCommands {
  workers = 'Работники',
  addRequest = 'Опубликовать заявку',
  requestsHistory = 'История заявок',
}

export const adminKeyboardBtns = [
  [
    adminKeyboardCommands.workers,
    Markup.button.webApp(
      adminKeyboardCommands.addRequest,
      'https://worker-client-react.vercel.app/',
    ),
  ],
  [adminKeyboardCommands.requestsHistory],
];

export const workerKeyboardBtns = [
  [
    workerKeyboardCommands.currentRequests,
    workerKeyboardCommands.currentWorkerRequests,
    workerKeyboardCommands.completedRequests,
  ],
  [workerKeyboardCommands.stats],
];
export const workerKeyboard: Markup.Markup<any> =
  Markup.keyboard(workerKeyboardBtns).resize();

export const adminKeyboard: Markup.Markup<any> =
  Markup.keyboard(adminKeyboardBtns).resize();
