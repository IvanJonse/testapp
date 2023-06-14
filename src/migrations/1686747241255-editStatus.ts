import { MigrationInterface, QueryRunner } from "typeorm"

export class EditStatus1686747241255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`
            alter table requests alter column status set default 'active';  
        `)
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
