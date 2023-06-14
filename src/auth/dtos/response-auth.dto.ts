import {
  ApiModelProperty
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ResponseUserDto } from './response-user.dto';

export class ResponseAuthDto {
  
  @ApiModelProperty()
  user: ResponseUserDto;
  
  @ApiModelProperty()
  token: string;
  
}
