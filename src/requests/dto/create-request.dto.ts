import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString, IsOptional, IsString, ValidateIf, IsNotEmpty, IsNumber } from 'class-validator';
import { RequestStatusEnum } from '../enums/request-status.enum';

export class CreateRequestDto {

    @ApiModelProperty()
    message: string

    @ApiModelPropertyOptional({
        type: 'enum',
        enum: Object.keys(RequestStatusEnum),
        example: RequestStatusEnum.ACTIVE,
        default: RequestStatusEnum.ACTIVE
    })
    status: RequestStatusEnum

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsString()
    @IsDateString()
    createdAt: Date

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsNumber()
    userId?: number

}
