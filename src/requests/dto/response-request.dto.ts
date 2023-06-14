import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { RequestStatusEnum } from '../enums/request-status.enum';
import { RoleEnum } from 'src/auth/enums/role.enum';

export class ResponseRequestDto {

    @ApiModelProperty()
    userId?: number

    @ApiModelProperty()
    requestId?: number

    @ApiModelProperty()
    name?: string

    @ApiModelProperty()
    email?: string

    @ApiModelPropertyOptional({
        type: 'enum',
        enum: Object.keys(RequestStatusEnum),
        example: RequestStatusEnum.ACTIVE,
        default: RequestStatusEnum.ACTIVE
    })
    status?: RequestStatusEnum

    @ApiModelProperty()
    message?: string

    @ApiModelProperty()
    comment?: string

    @ApiModelPropertyOptional()
    role?: RoleEnum

    @ApiModelPropertyOptional()
    createdAt?: Date

    @ApiModelPropertyOptional()
    updatedAt?: Date
}