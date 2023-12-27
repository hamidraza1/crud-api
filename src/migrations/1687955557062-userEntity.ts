import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1687955557062 implements MigrationInterface {
    name = 'UserEntity1687955557062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookmark" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "link" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userIdId" integer, CONSTRAINT "PK_b7fbf4a865ba38a590bb9239814" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_07991ef106818b570fb666f0278" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_07991ef106818b570fb666f0278"`);
        await queryRunner.query(`DROP TABLE "bookmark"`);
    }

}
