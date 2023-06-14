import { MigrationInterface, QueryRunner } from "typeorm"

export class EditUserRole1686770739397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`
            
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
