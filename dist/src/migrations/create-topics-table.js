"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTopicsTable = CreateTopicsTable;
const data_source_1 = require("../data-source");
async function CreateTopicsTable() {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS topics (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            description TEXT
        )
    `);
    await queryRunner.release();
}
//# sourceMappingURL=create-topics-table.js.map