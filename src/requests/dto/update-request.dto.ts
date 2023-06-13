import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString, IsOptional, IsNumber, IsString, ValidateIf, IsNotEmpty } from 'class-validator';
import { RequestStatusEnum } from '../enums/request-status.enum';
import { RoleEnum } from '../enums/role.enum';

export class UpdateRequestDto  {

    
    @ApiModelPropertyOptional()
    @IsOptional()
    @IsNumber()
    userId: number

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsNumber()
    requestId: number

    @ApiModelPropertyOptional()
    @IsOptional()
    status: RequestStatusEnum

    @ApiModelPropertyOptional()
    @IsString()
    @ValidateIf(e => e ===  RequestStatusEnum.RESOLVED)
    @IsNotEmpty()
    comment: string

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsDateString()
    updatedAt: Date
}
