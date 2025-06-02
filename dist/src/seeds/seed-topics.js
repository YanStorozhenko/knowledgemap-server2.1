"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const topic_entity_1 = require("../topics/entities/topic.entity");
const fs = require("fs");
const path = require("path");
async function seedTopics() {
    await data_source_1.AppDataSource.initialize();
    const repo = data_source_1.AppDataSource.getRepository(topic_entity_1.Topic);
    const filePath = path.join(__dirname, 'topics.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const topics = JSON.parse(rawData);
    for (const data of topics) {
        const exists = await repo.findOneBy({ title: data.title });
        if (!exists) {
            await repo.save(repo.create(data));
        }
    }
    console.log('✅ Topics seeded');
    process.exit(0);
}
seedTopics().catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
});
//# sourceMappingURL=seed-topics.js.map