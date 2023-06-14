import { MigrationInterface, QueryRunner } from "typeorm"

export class EditUserId1686746057937 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            alter table requests alter column user_id drop not null;     
            alter table requests alter created_at set default current_timestamp;     
            alter table requests alter updated_at set default current_timestamp;     
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
