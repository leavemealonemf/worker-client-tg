import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { PrismaService } from '../database/database.service';
import { UsersService } from '../users/users.service';

@Module({
  providers: [RequestsService, PrismaService, UsersService],
  exports: [RequestsService],
})
export class RequestsModule {}
