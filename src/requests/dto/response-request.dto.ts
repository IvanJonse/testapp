import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { RequestStatusEnum } from '../enums/request-status.enum';

export class ResponseRequestDto {
    @ApiModelProperty()
    userId: number

    @ApiModelProperty()
    requestId: number

    @ApiModelPropertyOptional({
        type: 'enum',
        enum: Object.keys(RequestStatusEnum),
        example: RequestStatusEnum.ACTIVE,
        default: RequestStatusEnum.ACTIVE
    })
    status: RequestStatusEnum

    @ApiModelProperty()
    message: string

    @ApiModelProperty()
    comment: string

    @ApiModelPropertyOptional()
    createdAt: Date

    @ApiModelPropertyOptional()
    updatedAt: Date
}

export class ResponseRequestPaginateDto {
    @ApiModelProperty({
        type: () => ResponseRequestDto,
        isArray: true
    })
    items: ResponseRequestDto[];
    
    @ApiModelProperty()
    count: number;
}
