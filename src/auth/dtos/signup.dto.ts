import {
  ApiModelProperty,
  ApiModelPropertyOptional
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { isPasswordRegex } from '../validation/password.regex';
import { IsEmail, IsOptional, IsString, Matches } from "class-validator";
import { isPhoneRegex } from '../validation/phone.regex';

export class SignupDto {
  @ApiModelPropertyOptional()
  @Matches(isPhoneRegex)
  @IsString()
  @IsOptional()
  phone: string;
  
  @ApiModelProperty()
  @IsEmail()
  @IsString()
  email: string;
  
  @ApiModelProperty()
  @Matches(isPasswordRegex)
  @IsString()
  password: string;
  
  @ApiModelProperty()
  @IsString()
  name: string;
}
