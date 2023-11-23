import { Controller, Post, Body } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private requestService: RequestsService) {}
  @Post()
  create(@Body() dto: CreateRequestDto) {
    return this.requestService.createRequest(dto, dto.createdById);
  }
}
