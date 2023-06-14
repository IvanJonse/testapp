import { RoleEnum } from "../enums/role.enum";

export interface JwtPayload {
  userId: number;
  email: string;
  phone: string;
  role: RoleEnum;
}