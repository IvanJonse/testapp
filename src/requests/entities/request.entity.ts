import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn
} from "typeorm";
import { RequestStatusEnum } from "../enums/request-status.enum";
import { UserEntity } from "../../user/user.entity";

@Entity("requests")
export class RequestEntity {
  
  @PrimaryGeneratedColumn("increment", {
    name: "request_id"
  })
  requestId: number;
  
  @Column({
    type: "enum",
    enum: RequestStatusEnum,
    default: RequestStatusEnum.ACTIVE
  })
  status: RequestStatusEnum;
  
  @Column({
    nullable: true
  })
  comment: string;
  
  @Column()
  message: string;
  
  @CreateDateColumn({
    name: "created_at"
  })
  createdAt: Date;
  
  @UpdateDateColumn({
    name: "updated_at"
  })
  updatedAt: Date;
  
  @ManyToOne(
    () => UserEntity,
    user => user.requests
  )
  @JoinColumn({
    name: "user_id"
  })
  user: UserEntity;
  
  @Column({
    name: "user_id"
  })
  userId: number;
}
