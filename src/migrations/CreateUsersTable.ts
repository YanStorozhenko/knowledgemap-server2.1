import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable implements MigrationInterface {
    name = 'CreateUsersTable.ts1739781925771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`firstName\` varchar(100) NOT NULL,
                \`lastName\` varchar(100) NOT NULL,
                \`email\` varchar(150) NOT NULL,
                \`password\` text NOT NULL,
                \`role\` enum ('admin', 'teacher', 'student', 'guest') NOT NULL DEFAULT 'student',
                \`phoneNumber\` varchar(20) NULL,
                \`avatarUrl\` text NULL,
                \`dateOfBirth\` date NULL,
                \`address\` varchar(255) NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\`
        `);
        await queryRunner.query(`
            DROP TABLE \`user\`
        `);
    }

}
