import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1688895613120 implements MigrationInterface {
    name = 'UserEntity1688895613120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "email"`);
        await queryRunner.query(`CREATE TABLE "report" ("id" SERIAL NOT NULL, "price" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "name"`);
    }

}
