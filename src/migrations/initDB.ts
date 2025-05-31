import { AppDataSource } from '../data-source';
import { Topic } from '../topics/entities/topic.entity';
import { Node } from '../nodes/entities/node.entity';
import * as fs from 'fs';
import * as path from 'path';

async function initDB() {
    await AppDataSource.initialize();

    const topicRepo = AppDataSource.getRepository(Topic);
    const nodeRepo = AppDataSource.getRepository(Node);

    // Шлях до JSON-файлу тем
    const filePath = path.join(__dirname, '../seeds/topics.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const topicData = JSON.parse(raw);

    let createdTopics = 0;
    let createdNodes = 0;

    // Створюємо теми
    for (const data of topicData) {
        const exists = await topicRepo.findOneBy({ title: data.title });
        if (!exists) {
            const topic = topicRepo.create(data);
            await topicRepo.save(topic);
            createdTopics++;
        }
    }

    // Створюємо вузли (по одному на кожну тему)
    const allTopics = await topicRepo.find();
    for (const topic of allTopics) {
        const existingNode = await nodeRepo.findOne({ where: { topic: { id: topic.id } } });
        if (!existingNode) {
            const node = nodeRepo.create({
                title: topic.title,
                topic: topic,
                x: null,
                y: null,
                color: null
            });
            await nodeRepo.save(node);
            createdNodes++;
        }
    }

    console.log(`✅ Topics created: ${createdTopics}`);
    console.log(`✅ Nodes created: ${createdNodes}`);
    console.log('🎉 База успішно ініціалізована');
    process.exit(0);
}

initDB().catch((e) => {
    console.error('❌ Init error:', e);
    process.exit(1);
});
