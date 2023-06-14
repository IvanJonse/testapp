import {
  ApiModelPropertyOptional,
  ApiModelProperty
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { RoleEnum } from '../enums/role.enum';

export class ResponseUserDto {
  @ApiModelProperty()
  userId: number;
  
  @ApiModelPropertyOptional()
  name: string;
  
  @ApiModelProperty()
  password: string;
  
  @ApiModelPropertyOptional({
	type: 'enum',
	enum: Object.keys(RoleEnum),
	example: RoleEnum.USER,
	default: RoleEnum.USER
  })
  role: RoleEnum;
  
  @ApiModelProperty()
  email: string;
  
  @ApiModelProperty()
  phone: string;

}