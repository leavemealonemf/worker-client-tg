import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { PrismaService } from '../database/database.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class RequestsService {
  constructor(
    private prismaService: PrismaService,
    private userService: UsersService,
  ) {}

  async getRequestStats(id: number){
    return this.prismaService.requests.findMany({where: {assignedToId: id}, select: {
      status: true,
      }})
  }

  async getRequests() {
    return this.prismaService.requests.findMany({
      where: { assignedToId: null },
    });
  }
  async createRequest(dto: CreateRequestDto, userId: number) {
    const user = await this.userService.findById(userId);

    if (!user || user.role === 'WORKER') {
      throw new BadGatewayException('У вас нет досутпа к сервису requests!');
    }

    return this.prismaService.requests.create({
      data: {
        title: dto.title,
        description: dto.description,
        createdById: userId,
      },
    });
  }

  async updateRequest(reqId: number, uuid: number, status: any) {
    const user = await this.userService.findUser(uuid);

    return this.prismaService.requests.update({
      where: { id: reqId },
      data: {
        assignedToId: user.id,
        status: status,
      },
    });
  }

  async getCurrentWorkerRequests(id: number) {
    return this.prismaService.requests.findMany({
      where: { assignedToId: id, status: 'PROGRESS' },
    });
  }

  async getCurrentWorkerCompletedRequests(id: number) {
    return this.prismaService.requests.findMany({
      where: { assignedToId: id, status: 'SUCCESS' },
    });
  }
}
