"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNodeConnectionsTable = CreateNodeConnectionsTable;
const data_source_1 = require("../data-source");
async function CreateNodeConnectionsTable() {
    const queryRunner = data_source_1.AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS node_connections (
            id INT PRIMARY KEY AUTO_INCREMENT,
            from_node_id INT NOT NULL,
            to_node_id INT NOT NULL,
            type VARCHAR(50),
            FOREIGN KEY (from_node_id) REFERENCES nodes(id) ON DELETE CASCADE,
            FOREIGN KEY (to_node_id) REFERENCES nodes(id) ON DELETE CASCADE
        )
    `);
    await queryRunner.release();
}
//# sourceMappingURL=create-node-connections-table.js.map