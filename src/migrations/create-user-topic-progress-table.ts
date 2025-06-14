import { AppDataSource } from '../data-source';

export async function CreateUserTopicProgressTable() {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS user_topic_progress (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            topic_id INT NOT NULL,
            status VARCHAR(20) DEFAULT 'not-started',
            progress FLOAT DEFAULT 0,
            completed_at TIMESTAMP NULL DEFAULT NULL,
            UNIQUE KEY unique_user_topic (user_id, topic_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
        );
    `);

    console.log('✅ Table user_topic_progress created');
    await queryRunner.release();
}
