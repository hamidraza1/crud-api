import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1703448280903 implements MigrationInterface {
    name = 'UserEntity1703448280903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" ADD "make" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "model" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "year" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "lang" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "lat" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "mileage" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "mileage"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "lang"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "model"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "make"`);
    }

}
