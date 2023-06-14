import { IsEnum } from "class-validator";
import { RequestStatusEnum } from "../enums/request-status.enum";

export class statusParamDto {
    @IsEnum(RequestStatusEnum)
    status: RequestStatusEnum
}