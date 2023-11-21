import { Markup } from 'telegraf';

export enum workerKeyboardCommands {
  currentRequests = 'Текущие заявки',
  completedRequests = 'Завершенные заявки',
  stats = 'Статистика',
}

export enum adminKeyboardCommands {
  workers = 'Работники',
  addNewWorker = 'Опубликовать заявку',
  requestsHistory = 'История заявок',
}

export const adminKeyboardBtns = [
  [
    adminKeyboardCommands.workers,
    adminKeyboardCommands.addNewWorker,
  ],
  [adminKeyboardCommands.requestsHistory],
];

export const workerKeyboardBtns = [
  [
    workerKeyboardCommands.currentRequests,
    workerKeyboardCommands.completedRequests,
  ],
  [workerKeyboardCommands.stats],
];
export const workerKeyboard: Markup.Markup<any> =
  Markup.keyboard(workerKeyboardBtns).resize();

export const adminKeyboard: Markup.Markup<any> =
    Markup.keyboard(adminKeyboardBtns).resize();

