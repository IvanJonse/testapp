import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestsService } from "./requests.service";
import { RequestsController } from "./requests.controller";
import { RequestEntity } from "./entities/request.entity";
import { UserEntity } from "../user/user.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RequestEntity,
      UserEntity
    ]),
    UserModule
  ],
  controllers: [RequestsController],
  providers: [RequestsService]
})
export class RequestsModule {
}
