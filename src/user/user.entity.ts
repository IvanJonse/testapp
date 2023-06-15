import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
  } from 'typeorm';
import { RequestEntity } from '../requests/entities/request.entity';
import { RoleEnum } from '../auth/enums/role.enum';


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
    
    @Column({
        type: 'enum',
        enum: RoleEnum,
        default: RoleEnum.ADMIN
    })
    role: RoleEnum

    @OneToMany (
        ()=> RequestEntity, 
        request => request.user 
    )
    requests: RequestEntity[]

}
