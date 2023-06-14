import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsString } from 'class-validator';

export class UpdateRequestDto  {
    @ApiModelProperty()
    @IsString()
    comment: string
}
