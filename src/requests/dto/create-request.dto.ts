import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsDateString, IsOptional, IsString, ValidateIf, IsNotEmpty, IsNumber } from 'class-validator';
import { RequestStatusEnum } from '../enums/request-status.enum';
import { RoleEnum } from '../enums/role.enum';

export class CreateRequestDto {
    
    @ApiModelProperty()
    @IsString()
    name: string

    @ApiModelProperty()
    @IsString()
    email: string

    @ApiModelPropertyOptional()
    @IsOptional()
    role: RoleEnum

    @ApiModelProperty()
    message: string

    @ApiModelPropertyOptional()
    status: RequestStatusEnum

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsString()
    @IsDateString()
    createdAt: Date

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsDateString()
    updatedAt: Date

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsNumber()
    userId?: number



}
