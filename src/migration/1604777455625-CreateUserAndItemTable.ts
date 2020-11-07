import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAndItemTable1604777455625 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE "user" (
            id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
            name character varying NOT NULL,
            "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
            "updatedAt" timestamp without time zone NOT NULL DEFAULT now()
        );`);

		await queryRunner.query(`CREATE TABLE item (
            id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
            name character varying NOT NULL,
            weight numeric NOT NULL,
            "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
            "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
            "userId" uuid REFERENCES "user"(id)
        );
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('item', true);
		await queryRunner.dropTable('user', true);
	}
}
