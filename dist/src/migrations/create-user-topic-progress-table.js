"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTopicProgressTable = CreateUserTopicProgressTable;
const data_source_1 = require("../data-source");
async function CreateUserTopicProgressTable() {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS user_topic_progress (
                                                           id INT PRIMARY KEY AUTO_INCREMENT,
                                                           user_uid VARCHAR(64) NOT NULL,
            topic_id INT NOT NULL,
            status VARCHAR(255) DEFAULT 'not-started',
            progress FLOAT DEFAULT 0,
            completed_at TIMESTAMP NULL,
            CONSTRAINT fk_topic FOREIGN KEY (topic_id) REFERENCES topics(id)
            )
    `);
    console.log('✅ Table user_topic_progress created');
    await queryRunner.release();
}
//# sourceMappingURL=create-user-topic-progress-table.js.map