import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntity1688137476747 implements MigrationInterface {
    name = 'UserEntity1688137476747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_info" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "link" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_b075c73d917a898757645dc492" UNIQUE ("userId"), CONSTRAINT "PK_65b98fa4ffb26dceb9192f5d496" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contact_info" ADD CONSTRAINT "FK_b075c73d917a898757645dc4924" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_info" DROP CONSTRAINT "FK_b075c73d917a898757645dc4924"`);
        await queryRunner.query(`DROP TABLE "contact_info"`);
    }

}
