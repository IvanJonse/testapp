import {
  ApiModelProperty
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { isPasswordRegex } from '../validation/password.regex';

export class SigninDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiModelProperty()
  @Matches(isPasswordRegex)
  @IsNotEmpty()
  password: string;
}