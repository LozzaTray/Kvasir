import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1642846768951 implements MigrationInterface {
    name = "InitialMigration1642846768951";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "drink" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_d2bcca4059e927221cce0f95756" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "pub" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "lat" integer NOT NULL,
                "lng" integer NOT NULL,
                CONSTRAINT "PK_f193381478158e93cb41936f8fc" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "pub_drink" (
                "id" SERIAL NOT NULL,
                "pence" integer NOT NULL,
                "pubId" integer,
                "drinkId" integer,
                CONSTRAINT "PK_33eb02fd04052ed5b8009a02465" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                "email" character varying NOT NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "pub_drink"
            ADD CONSTRAINT "FK_2bd41ecfdd1063a8387cd24d002" FOREIGN KEY ("pubId") REFERENCES "pub"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pub_drink"
            ADD CONSTRAINT "FK_6405bcaf7ea2e2fff920e53163d" FOREIGN KEY ("drinkId") REFERENCES "drink"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "pub_drink" DROP CONSTRAINT "FK_6405bcaf7ea2e2fff920e53163d"
        `);
        await queryRunner.query(`
            ALTER TABLE "pub_drink" DROP CONSTRAINT "FK_2bd41ecfdd1063a8387cd24d002"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "pub_drink"
        `);
        await queryRunner.query(`
            DROP TABLE "pub"
        `);
        await queryRunner.query(`
            DROP TABLE "drink"
        `);
    }
}
