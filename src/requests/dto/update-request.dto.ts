import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString, IsOptional, IsNumber, IsString, ValidateIf, IsNotEmpty } from 'class-validator';
import { RequestStatusEnum } from '../enums/request-status.enum';

export class UpdateRequestDto  {

    
    @ApiModelPropertyOptional()
    @IsOptional()
    @IsNumber()
    userId: number

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsNumber()
    requestId: number

    @ApiModelPropertyOptional({
        type: 'enum',
        enum: Object.keys(RequestStatusEnum),
        example: RequestStatusEnum.ACTIVE,
        default: RequestStatusEnum.ACTIVE
    })
    @IsOptional()
    status: RequestStatusEnum

    @ApiModelPropertyOptional()
    @IsString()
    @ValidateIf(e => e.status === RequestStatusEnum.RESOLVED)
    @IsNotEmpty()
    comment: string

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsDateString()
    updatedAt: Date
}
