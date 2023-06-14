import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
  } from 'typeorm';
import { RequestEntity } from '../requests/entities/request.entity';
import { RoleEnum } from 'src/auth/enums/role.enum';

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn('increment', {
        name: 'user_id'
    })
    userId: number;

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    phone: string;

    @Column({
        select: false
    })
    password: string
    
    //TODO дефолтная роль, убрать null
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
