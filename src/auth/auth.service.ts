import { Injectable } from "@nestjs/common";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { SignupDto } from "./dtos/signup.dto";
import { AlreadyExists, EmailError, PasswordError } from "../http.exceptions";
import { SigninDto } from "./dtos/signin.dto";
import { ResponseAuthDto } from "./dtos/response-auth.dto";
import { UserEntity } from "src/user/user.entity";
import { hashConfig } from "src/config/app.config";

const bcrypt = require("bcrypt");

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private user: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {
  }
  
  async authorizedUser(body: SigninDto): Promise<ResponseAuthDto> {
    const user: UserEntity = await this.findOneByEmail(body.email);
    if (!user) {
      throw new EmailError();
    }
    const checkPassword = await this.checkPasswordHash(
      body.password,
      user.password
    );
    if (!checkPassword) {
      throw new PasswordError();
    }
    delete user.password;
    const token: string = this.composeToken(body);
    return { token, user };
  }
  
  async getPasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, hashConfig.saltRounds);
  }
  
  async checkPasswordHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
  
  async createNewUser(body: SignupDto): Promise<ResponseAuthDto> {
    await this.userIsUnique(body.email, body.phone);
    body.password = await this.getPasswordHash(body.password);
    const user = await this.user.save(body);
    delete user.password;
    const token = this.composeToken(body);
    return { token, user };
  }
  
  async userIsUnique(email: string, phone: string) {
    const checkUser = await this
      .user
      .createQueryBuilder("u")
      .where("u.phone = :phone", { phone })
      .orWhere("u.email = :email", { email })
      .getOne();
    if (checkUser) {
      throw new AlreadyExists();
    }
  }
  
  findOneByEmail(email: string) {
    return this
      .user
      .createQueryBuilder("u")
      .where("u.email = :email", { email })
      .addSelect("u.password")
      .getOne();
  }
  
  validateUser(payload: JwtPayload): Promise<UserEntity> {
    return this
      .user
      .findOne({
        where: {
          email: payload.email
        }
      });
  }
  
  composeToken(user: UserEntity | Partial<UserEntity>): string {
    const payload: JwtPayload = {
      userId: user.userId,
      email: user.email,
      role: user.role,
      phone: user.phone
    };
    return `${this
      .jwtService
      .sign(payload)}`;
  }
}
