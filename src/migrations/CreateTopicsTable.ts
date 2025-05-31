import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTopicsTable implements MigrationInterface {
    name = 'CreateTopicsTable' + Date.now();

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`topics\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`description\` text NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`topics\`
        `);
    }
}
