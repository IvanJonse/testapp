import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestEntity } from './entities/request.entity';
import { ResponseRequestDto } from './dto/response-request.dto';
import { UserEntity } from '../user/user.entity';
import { RequestStatusEnum } from './enums/request-status.enum';
import { statusParamDto } from './dto/status-param.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity) private request: Repository<RequestEntity>,
    @InjectRepository(UserEntity) private user: Repository<UserEntity>,
    
    ) {
    }

  createRequest( body: CreateRequestDto): Promise<ResponseRequestDto> {
    return this.request.save(body)
  }

  findOneByEmail(status: RequestStatusEnum, updatedAt: Date) {
    return this
      .request
      .createQueryBuilder('u')
      .where('u.status = :status', { status })
      .andWhere('u.updated_at = :updatedAt', {updatedAt})
      .getOne();
    }

  findAllRequest(): Promise<ResponseRequestDto[]>  {
    // this.findOneByEmail()
    return this.request.find()
  }

  findOneRequest(requestId: number): Promise<ResponseRequestDto> {
    return this.request.findOneOrFail({
      where: {
        requestId
      }
    })
  }

  setStatus(request_id: number,body: UpdateRequestDto) {    
    const query = this.request.createQueryBuilder()
     .update(body)
     .where("request_id = :request_id", {request_id})
     if (body.comment) {
         query.set({ 
          status: RequestStatusEnum.RESOLVED ,
          comment: body.comment
       })
     } 
     query.execute()
   }
 
   async updateRequest(request_id: number, body: UpdateRequestDto) {
    await this.setStatus(request_id, body )
    
   }




  

 

  async removeRequest(requestId: number) {
    await this.request.delete(requestId)
  }
}
