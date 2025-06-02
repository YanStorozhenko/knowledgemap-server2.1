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
            email VARCHAR(255),
            name VARCHAR(255),
            avatar_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    await queryRunner.release();
}
//# sourceMappingURL=create-users-table.js.map