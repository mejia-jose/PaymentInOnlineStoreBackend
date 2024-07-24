import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1721674037516 implements MigrationInterface {
    name = 'Init1721674037516'

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.query(`CREATE TABLE "tbProducto"
        (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "name" character varying NOT NULL, 
            "description" character varying NOT NULL, 
            "price" integer NOT NULL, 
            "stock" integer NOT NULL, 
            "image" character varying NOT NULL, 
            "state" integer NOT NULL, 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "PK_6a31470f173ba3cc01800cf451c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tbProducto"`);
    }

}
