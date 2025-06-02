"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const create_node_connections_table_1 = require("./create-node-connections-table");
const seed_node_connections_1 = require("../seeds/seed-node-connections");
const topic_entity_1 = require("../topics/entities/topic.entity");
const node_entity_1 = require("../nodes/entities/node.entity");
const fs = require("fs");
const path = require("path");
async function initDb() {
    try {
        await data_source_1.AppDataSource.initialize();
        await (0, create_node_connections_table_1.CreateNodeConnectionsTable)();
        const topicRepo = data_source_1.AppDataSource.getRepository(topic_entity_1.Topic);
        const nodeRepo = data_source_1.AppDataSource.getRepository(node_entity_1.Node);
        const filePath = path.join(__dirname, '../seeds/topics.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        const topicData = JSON.parse(raw);
        let createdTopics = 0;
        let createdNodes = 0;
        await (0, seed_node_connections_1.seedNodeConnections)();
        console.log(`✅ Topics created: ${createdTopics}`);
        console.log(`✅ Nodes created: ${createdNodes}`);
        console.log('🎉 База успішно ініціалізована');
        process.exit(0);
    }
    catch (e) {
        console.error('❌ Init error:', e);
        process.exit(1);
    }
}
initDb();
//# sourceMappingURL=init-db.js.map