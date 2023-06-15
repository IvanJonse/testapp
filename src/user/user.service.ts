import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { AuthService } from "../auth/auth.service";
import { MailerService } from "@nestjs-modules/mailer";
import { Signup } from "../mail/templates";

const generator = require('generate-password');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private user: Repository<UserEntity>,
    private authService: AuthService,
    private mailService: MailerService,
  ) {
  }
  
  
  async findUserOrCreate(
    email: string,
    name: string
  ): Promise<number> {
    const user = await this.user.findOne({
      where: {
        email
      }
    });
    
    if (user) {
      return user.userId;
    }
  
    const password = generator.generate({
      length: 10,
    });
    
    const hashPassword = await this.authService.getPasswordHash(password);
    
    const newUser = await this.user.save({
      name,
      email,
      password: hashPassword,
    });
  
    this.mailService
      .sendMail(Signup(newUser.email, password))
      .catch((error) => console.error(error));

    
    return newUser.userId;
  }
}
