import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1688140838482 implements MigrationInterface {
    name = 'UserEntity1688140838482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "name"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" TO "UQ_065d4d8f3b5adb4a08841eae3c8"`);
        await queryRunner.query(`ALTER TABLE "contact_info" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "contact_info" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "contact_info" DROP COLUMN "link"`);
        await queryRunner.query(`ALTER TABLE "contact_info" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_info" ADD CONSTRAINT "UQ_d6ab4c70d05da571e03f2cc3ff2" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "contact_info" DROP CONSTRAINT "UQ_d6ab4c70d05da571e03f2cc3ff2"`);
        await queryRunner.query(`ALTER TABLE "contact_info" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "contact_info" ADD "link" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_info" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact_info" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" TO "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "email"`);
    }

}
