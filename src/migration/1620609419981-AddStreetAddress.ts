import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStreetAddress1620609419981 implements MigrationInterface {
  name = "AddStreetAddress1620609419981";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "street_addresses" ("id" SERIAL NOT NULL, "lineOne" character varying NOT NULL, "lineTwo" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip" character varying NOT NULL, CONSTRAINT "PK_9cf56d41e0ef13f50cc932c567f" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "street_address"`);
  }
}
