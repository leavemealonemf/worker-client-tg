import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { RequestsService } from '../requests/requests.service';
import { PrismaService } from '../database/database.service';
import { UsersService } from '../users/users.service';

@Module({
  providers: [MessagesService, RequestsService, PrismaService, UsersService],
  exports: [MessagesService],
})
export class MessagesModule {}
