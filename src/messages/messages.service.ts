import { Injectable } from '@nestjs/common';

interface IMessageTemplates {
  sendStats: (completedRequests: number, inProgressRequests: number) => string;
}
@Injectable()
export class MessagesService implements IMessageTemplates {
  sendStats(completedRequests, inProgressRequests): string {
    return `
<b>Ваша статистика:</b>
Выполненных заявок: ${completedRequests || 0}
В процессе: ${inProgressRequests || 0}
    `;
  }
}
