import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { SigninDto } from './dtos/signin.dto';
import { ResponseAuthDto } from './dtos/response-auth.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
	private authService: AuthService
  ) {
  }
  
  @ApiOkResponse({
	type: ResponseAuthDto
  })
  @Post('/signup')
  registerUser(@Body() body: SignupDto): Promise<ResponseAuthDto> {
	return this.authService.createNewUser(body);
  }
 
  @ApiOkResponse({
	type: ResponseAuthDto
  })
  @Post('/sign-in')
  authUser(@Body() body: SigninDto): Promise<ResponseAuthDto> {
	return this.authService.authorizedUser(body);
  }
}