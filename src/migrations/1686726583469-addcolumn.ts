import { MigrationInterface, QueryRunner } from "typeorm"

export class Addcolumn1686726583469 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        alter table users add column password text;
        alter table users add column phone text;
`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
