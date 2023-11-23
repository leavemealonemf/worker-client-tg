import { Injectable } from '@nestjs/common';
import { RequestsService } from '../requests/requests.service';

interface IMessageTemplates {
  sendStats: (userId: number) => Promise<any>;
}
@Injectable()
export class MessagesService implements IMessageTemplates {
  _completedReq = [];
  _inProgressReq = [];

  constructor(private requestService: RequestsService) {}

  async sendStats(userId: number): Promise<any> {
    this._completedReq = [];
    this._inProgressReq = [];
    const res = await this.requestService.getRequestStats(userId);
    res.forEach((r) => {
      if (r.status === 'SUCCESS') {
        this._completedReq.push(r);
        return;
      }
      if (r.status === 'PROGRESS') {
        this._inProgressReq.push(r);
        return;
      }
    });
    return `
<b>Ваша статистика:</b>
Выполненных заявок: ${this._completedReq.length}
В процессе: ${this._inProgressReq.length}
    `;
  }
}
