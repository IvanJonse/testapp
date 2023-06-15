import { BadRequestException, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MailerService } from "@nestjs-modules/mailer";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { RequestEntity } from "./entities/request.entity";
import { ResponseRequestDto, ResponseRequestPaginateDto } from "./dto/response-request.dto";
import { RequestStatusEnum } from "./enums/request-status.enum";
import { QueryRequestDto } from "./dto/query-request.dto";
import { UserService } from "../user/user.service";
import { CreatedRequest, ResolvedRequest } from "../mail/templates";

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity) private request: Repository<RequestEntity>,
    private userService: UserService,
    private mailService: MailerService,
    private dataSource: DataSource
  ) {
  }
  
  async createRequest(body: CreateRequestDto): Promise<ResponseRequestDto> {
    
    const userId: number = await this.userService.findUserOrCreate(
      body.email,
      body.name
    );
    const request = await this.request.save({
      message: body.message,
      userId
    });
    
    this.mailService
      .sendMail(CreatedRequest(body.email, request.requestId))
      .catch((error) => console.error(error));
    
    return request;
  }
  
  async findAllRequest(
    query: QueryRequestDto
  ): Promise<ResponseRequestPaginateDto> {
    const queryBuilder = this.request
      .createQueryBuilder("r")
      .leftJoinAndSelect("r.user", "u");
    
    if (query.status) {
      queryBuilder.where("r.status = :status", {
        status: query.status
      });
    }
    
    if (query.updatedAt) {
      queryBuilder.andWhere("r.updated_at::date = :updatedAt", {
        updatedAt: query.updatedAt
      });
    }
    
    queryBuilder
      .take(query.take)
      .skip(query.skip);
    
    const [items, count] = await queryBuilder.getManyAndCount();
    
    return {
      items,
      count
    };
  }
  
  findOneRequest(requestId: number): Promise<ResponseRequestDto> {
    return this.request.findOneOrFail({
      where: {
        requestId
      }
    });
  }
  
  async updateRequest(requestId: number, body: UpdateRequestDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .createQueryBuilder(RequestEntity, 'r')
        .update()
        .set({
          status: RequestStatusEnum.RESOLVED,
          comment: body.comment,
        })
        .where("request_id = :requestId", { requestId })
        .execute();
      
      const request = await queryRunner.manager.findOneOrFail(RequestEntity, {
        relations: ['user'],
        where: {
          requestId,
        },
      });
      
      if (request.status !== RequestStatusEnum.RESOLVED) {
        throw new BadRequestException();
      }
      
      await queryRunner.commitTransaction();
      
      this.mailService
        .sendMail(ResolvedRequest(request.user.email, requestId))
        .catch((error) => console.error(error));
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  
  async removeRequest(requestId: number) {
    await this.request.delete(requestId);
  }
}
