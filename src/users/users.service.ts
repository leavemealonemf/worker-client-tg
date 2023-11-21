import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        uuid: dto.uuid,
        userName: dto.userName,
      },
    });
  }

  async findAll() {
    return this.prismaService.user.findMany({ where: { role: "WORKER" } });
  }

  async findUser(uuid: number) {
    return this.prismaService.user.findFirst({ where: { uuid: uuid } });
  }
}
