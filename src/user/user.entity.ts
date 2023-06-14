import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
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
