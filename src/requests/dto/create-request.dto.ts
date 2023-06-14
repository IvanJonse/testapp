import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEmail, IsString } from "class-validator";

export class CreateRequestDto {
    @ApiModelProperty()
    message: string

    @ApiModelProperty()
    @IsEmail()
    email: string;
    
    @ApiModelProperty()
    @IsString()
    name: string;
}
