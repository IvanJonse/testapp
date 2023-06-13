import { MigrationInterface, QueryRunner } from "typeorm"

export class Init1686653369922 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`

            CREATE TYPE role_user AS ENUM ('admin', 'user');
            CREATE TABLE users (
                user_id      int8 not null,
                name         text not null,
                email        text not null, 	 
                role         role_user,	
                CONSTRAINT user_pk PRIMARY KEY (user_id) 
            );

            CREATE TYPE role_status AS ENUM ('active', 'resolved');
            CREATE TABLE requests (
                request_id   int8,
                status       role_status,
                message	     text not null, 
                comment      text, 	 
                created_at   timestamp,
                updated_at   timestamp, 
                user_id      int8 not null,    
                CONSTRAINT request_pk PRIMARY KEY (request_id),
                CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users(user_id)
            );
            
        `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
