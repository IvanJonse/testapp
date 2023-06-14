import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString, IsOptional, IsString, ValidateIf, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { RequestStatusEnum } from '../enums/request-status.enum';
import { statusParamDto } from './status-param.dto';

export class CreateRequestDto {

    @ApiModelProperty()
    message: string

    @ApiModelPropertyOptional({
        type: 'enum',
        enum: Object.keys(RequestStatusEnum),
        example: RequestStatusEnum.ACTIVE,
        default: RequestStatusEnum.ACTIVE
    })
    @IsOptional()
    @IsEnum(RequestStatusEnum)
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
