import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { RequestEntity } from './entities/request.entity';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RequestEntity,
      UserEntity,
    ]),
  ],
  controllers: [RequestsController],
  providers: [RequestsService]
})
export class RequestsModule {}
