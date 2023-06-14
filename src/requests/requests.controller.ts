import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param,
  ParseIntPipe,
  Delete, 
  HttpCode,
  UseGuards 
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ResponseRequestDto } from './dto/response-request.dto';
import { RoleEnum } from './enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RequestStatusEnum } from './enums/request-status.enum';

@ApiTags('Requests')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}
  
  @ApiOkResponse({
    type: ResponseRequestDto
  })
  @Post()
  createRequest(@Body() body: CreateRequestDto): Promise<ResponseRequestDto> {
    return this.requestsService.createRequest(body);
  }

  @ApiOkResponse({
    isArray: true,
    type: ResponseRequestDto
  })
  @Get()
  findAllRequest(
    @Param('status') status: RequestStatusEnum, 
    @Param('updatedAt') updatedAt: Date  
    ): Promise<ResponseRequestDto[]>  {
    return this.requestsService.findAllRequest(status, updatedAt);
  }

  @ApiOkResponse({
    type: ResponseRequestDto
  })
  @Get(':requestId')
  findOneRequest(@Param('requestId', ParseIntPipe) requestId: number): Promise<ResponseRequestDto> {
    return this.requestsService.findOneRequest(requestId);
  }

  @ApiOkResponse({
    type: ResponseRequestDto
  })
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':requestId')
  updateRequest(@Param('requestId', ParseIntPipe) requestId: number, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.updateRequest(requestId, updateRequestDto);
  }

  @HttpCode(204)
  @Delete(':requestId')
  removeRequest(@Param('requestId', ParseIntPipe) requestId: number) {
    return this.requestsService.removeRequest(requestId);
  }
}
