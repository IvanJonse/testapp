import { MigrationInterface, QueryRunner } from "typeorm"

export class Increment1686674188687 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        create sequence users_user_id_seq;
        alter sequence users_user_id_seq owned by users.user_id;
        alter table users alter column user_id set default nextval('public.users_user_id_seq'::regclass);

        create sequence requests_request_id_seq;
        alter sequence requests_request_id_seq owned by requests.request_id;
        alter table requests alter column request_id set default nextval('public.requests_request_id_seq'::regclass);   
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
