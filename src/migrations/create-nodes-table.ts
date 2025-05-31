import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNodesTable implements MigrationInterface {
    name = 'CreateNodesTable'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`node\` (
                                      \`id\` int NOT NULL AUTO_INCREMENT,
                                      \`title\` varchar(255) NOT NULL,
                                      \`topic_id\` int NOT NULL,
                                      \`x\` float NULL,
                                      \`y\` float NULL,
                                      \`color\` varchar(255) NULL,
                                      PRIMARY KEY (\`id\`),
                                      CONSTRAINT \`FK_node_topic\` FOREIGN KEY (\`topic_id\`) REFERENCES \`topic\`(\`id\`) ON DELETE CASCADE
            ) ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`node\``);
    }
}
