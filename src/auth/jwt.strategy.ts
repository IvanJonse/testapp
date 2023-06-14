import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { envFile } from '../config/app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
	super({
	  jwtFromRequest: ExtractJwt.fromExtractors([
		ExtractJwt.fromAuthHeaderAsBearerToken()
	  ]),
	  secretOrKey: envFile.jwtSecret,
	});
  }
  
  async validate(payload: JwtPayload) {
	const user = await this.authService.validateUser(payload);
	if (!user) {
	  throw new UnauthorizedException('User does not exist');
	}
	return user;
  }
}