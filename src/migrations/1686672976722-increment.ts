import { MigrationInterface, QueryRunner } from "typeorm"

export class Increment1686672976722 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`
                
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}