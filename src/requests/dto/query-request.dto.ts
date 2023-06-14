import {
  ApiModelProperty,
  ApiModelPropertyOptional
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { RequestStatusEnum } from "../enums/request-status.enum";
import { IsDateString, IsEnum, IsNumber, IsOptional, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class QueryRequestDto {
  @ApiModelPropertyOptional({
    type: 'enum',
    enum: Object.values(RequestStatusEnum),
  })
  @IsEnum(RequestStatusEnum)
  @IsOptional()
  status: RequestStatusEnum;
  
  @ApiModelPropertyOptional()
  @IsDateString()
  @IsOptional()
  updatedAt: Date;
  
  @ApiModelProperty()
  @IsNumber()
  @Type(() => Number)
  @Max(100)
  @Min(1)
  take: number;
  
  @ApiModelProperty()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  skip: number;
}
