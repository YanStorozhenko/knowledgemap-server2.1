"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const create_users_table_1 = require("./create-users-table");
const topic_entity_1 = require("../topics/entities/topic.entity");
const node_entity_1 = require("../nodes/entities/node.entity");
const fs = require("fs");
const path = require("path");
async function initDb() {
    try {
        await data_source_1.AppDataSource.initialize();
        await (0, create_users_table_1.CreateUsersTable)();
        const topicRepo = data_source_1.AppDataSource.getRepository(topic_entity_1.Topic);
        const nodeRepo = data_source_1.AppDataSource.getRepository(node_entity_1.Node);
        const filePath = path.join(__dirname, '../seeds/topics.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        const topicData = JSON.parse(raw);
        let createdTopics = 0;
        let createdNodes = 0;
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