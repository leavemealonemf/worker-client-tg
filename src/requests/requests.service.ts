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

  async getRequests() {
    return this.prismaService.requests.findMany();
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
}
