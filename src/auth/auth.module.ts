import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { jwtOptions } from '../config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
	ConfigModule.forRoot(),
	PassportModule.register({
	  defaultStrategy: 'jwt',
	}),
	JwtModule.register(jwtOptions),
	TypeOrmModule.forFeature([
	  UserEntity,
	]),
  ],
  controllers: [AuthController],
  providers: [
	AuthService,
	JwtStrategy,
  ],
  exports: [
	JwtModule,
	AuthService
  ],
})
export class AuthModule {

}

