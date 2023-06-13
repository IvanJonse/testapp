import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
import { RequestStatusEnum } from '../enums/request-status.enum';
import { UserEntity } from './user.entity';

@Entity('requests')
export class RequestEntity {
    @PrimaryGeneratedColumn( 'increment', {
        name: 'request_id'
    })
    requestId: number;

    @Column({
        type: 'enum',
        enum: RequestStatusEnum,
        nullable: true,
        default: RequestStatusEnum.ACTIVE
    })
    status: RequestStatusEnum

    @Column({
        nullable: true
    })
    comment: string

    @Column()
    message: string

    @Column('timestamp', {
    name: 'created_at',
    nullable: true
    })
    createdAt: Date;
    
    @Column('timestamp', {
    name: 'updated_at',
    nullable: true
    })
    updatedAt: Date;

    @ManyToOne(
        () => UserEntity,
         user => user.requests
      )
      @JoinColumn({
        name: 'user_id'
      })
      user: UserEntity;
    @Column( {name: 'user_id'})
    userId: number
}
