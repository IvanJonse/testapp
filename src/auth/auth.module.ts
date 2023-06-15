import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtOptions } from "../config/app.config";
import { UserEntity } from "../user/user.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({
      defaultStrategy: "jwt"
    }),
    JwtModule.register(jwtOptions),
    TypeOrmModule.forFeature([
      UserEntity
    ])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtModule,
    AuthService
  ]
})
export class AuthModule {

}

