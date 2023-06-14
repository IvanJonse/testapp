import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ]),
    AuthModule
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {
}
