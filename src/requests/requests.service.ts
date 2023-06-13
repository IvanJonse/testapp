import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestEntity } from './entities/request.entity';
import { ResponseRequestDto } from './dto/response-request.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity) private request: Repository<RequestEntity>,
    @InjectRepository(UserEntity) private user: Repository<UserEntity>,
    
    ) {
    }

  createRequest(body: CreateRequestDto): Promise<ResponseRequestDto> {
    return this.request.save(body)
  }

  findAllRequest() {
    return this.request.find()
  }

  findOneRequest(requestId: number): Promise<ResponseRequestDto> {
    return this.request.findOneOrFail({
      where: {
        requestId
      }
    })
  }

  async updateRequest(requestId: number, body: UpdateRequestDto) {
   await this.request.update(requestId, body)
  }

  async removeRequest(requestId: number) {
    await this.request.delete(requestId)
  }
}
