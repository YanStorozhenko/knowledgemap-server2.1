import { AppDataSource } from '../data-source';
import { QueryRunner } from 'typeorm';

export async function CreateUsersTable() {
    const queryRunner: QueryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(255),
            name VARCHAR(255),
            avatar_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    await queryRunner.release();
}
