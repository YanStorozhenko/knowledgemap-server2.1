"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNodesTable = CreateNodesTable;
const data_source_1 = require("../data-source");
async function CreateNodesTable() {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS nodes (
                                             id INT PRIMARY KEY AUTO_INCREMENT,
                                             title VARCHAR(255) NOT NULL,
            topic_id INT,
            x FLOAT NULL,
            y FLOAT NULL,
            color VARCHAR(255),
            FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE SET NULL
            )
    `);
    await queryRunner.release();
}
//# sourceMappingURL=create-nodes-table.js.map