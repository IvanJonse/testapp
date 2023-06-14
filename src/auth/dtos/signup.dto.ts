import {
  ApiModelProperty,
  ApiModelPropertyOptional
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { isPasswordRegex } from '../validation/password.regex';
import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { isPhoneRegex } from '../validation/phone.regex';

export class SignupDto {
  @ApiModelProperty()
  @Matches(isPhoneRegex)
  @IsNotEmpty()
  phone: string;
  
  @ApiModelPropertyOptional()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;
  
  @ApiModelProperty()
  @Matches(isPasswordRegex)
  @IsNotEmpty()
  password: string;
}