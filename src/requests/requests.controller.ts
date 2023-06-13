import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ResponseRequestDto } from './dto/response-request.dto';

@ApiTags('Requests')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  createRequest(@Body() body: CreateRequestDto): Promise<ResponseRequestDto> {
    return this.requestsService.createRequest(body);
  }

  @Get()
  findAllRequest()  {
    return this.requestsService.findAllRequest();
  }

  @Get(':requestId')
  findOneRequest(@Param('requestId') requestId: number) {
    return this.requestsService.findOneRequest(requestId);
  }

  @Patch(':requestId')
  updateRequest(@Param('requestId') requestId: number, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.updateRequest(requestId, updateRequestDto);
  }

  @Delete(':requestId')
  removeRequest(@Param('requestId') requestId: string) {
    return this.requestsService.removeRequest(+requestId);
  }
}
