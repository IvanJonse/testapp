import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
  } from 'typeorm';
import { RoleEnum } from '../enums/role.enum';
import { RequestEntity } from './request.entity';

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn('increment', {
        name: 'user_id'
    })
    userId: number;

    @Column()
    name: string

    @Column()
    email: string

    @Column({
        type: 'enum',
        enum: RoleEnum,
        nullable: true,
        default: RoleEnum.USER
    })
    role: RoleEnum

    @OneToMany (
        ()=> RequestEntity, 
        request => request.user 
    )
    requests: RequestEntity[]

   

}
