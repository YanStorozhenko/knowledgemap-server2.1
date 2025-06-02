"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable = CreateUsersTable;
const data_source_1 = require("../data-source");
async function CreateUsersTable() {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users (
                                             id INT PRIMARY KEY AUTO_INCREMENT,
                                             firebase_uid VARCHAR(128) UNIQUE,
            email VARCHAR(255) UNIQUE NOT NULL,
            name VARCHAR(255),
            avatarUrl TEXT,
            role ENUM('admin', 'teacher', 'student', 'guest') DEFAULT 'student',
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
    `);
    await queryRunner.release();
}
//# sourceMappingURL=create-users-table.js.map