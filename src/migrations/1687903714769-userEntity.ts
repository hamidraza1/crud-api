import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1687903714769 implements MigrationInterface {
    name = 'UserEntity1687903714769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "password" TO "name"`);
    }

}
