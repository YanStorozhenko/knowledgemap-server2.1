import { AppDataSource } from '../data-source';
import { CreateTopicsTable } from './create-topics-table';
import { CreateNodesTable } from './create-nodes-table';
import { CreateUsersTable } from './create-users-table';
import { CreateNodeConnectionsTable } from './create-node-connections-table';

import { seedNodeConnections } from '../seeds/seed-node-connections';


import { Topic } from '../topics/entities/topic.entity';
import { Node } from '../nodes/entities/node.entity';

import * as fs from 'fs';
import * as path from 'path';

async function initDb() {
    try {
        await AppDataSource.initialize();

        // Створення таблиць
        // await CreateTopicsTable();
        // await CreateNodesTable();
        // await CreateUsersTable();
        await CreateNodeConnectionsTable();

        const topicRepo = AppDataSource.getRepository(Topic);
        const nodeRepo = AppDataSource.getRepository(Node);

        // Шлях до JSON-файлу з темами
        const filePath = path.join(__dirname, '../seeds/topics.json');
        const raw = fs.readFileSync(filePath, 'utf-8');
        const topicData = JSON.parse(raw);

        let createdTopics = 0;
        let createdNodes = 0;

        // Створюємо теми
        // for (const data of topicData) {
        //     const exists = await topicRepo.findOneBy({ title: data.title });
        //     if (!exists) {
        //         const topic = topicRepo.create(data);
        //         await topicRepo.save(topic);
        //         createdTopics++;
        //     }
        // }

        // Створюємо вузли (по одному на кожну тему)
        // const allTopics = await topicRepo.find();
        // for (const topic of allTopics) {
        //     const existingNode = await nodeRepo.findOne({ where: { topic: { id: topic.id } } });
        //     if (!existingNode) {
        //         const node = nodeRepo.create({
        //             title: topic.title,
        //             topic,
        //             x: undefined,
        //             y: undefined,
        //             color: undefined
        //         } as Partial<Node>);
        //
        //
        //         await nodeRepo.save(node);
        //         createdNodes++;
        //     }
        // }

        await seedNodeConnections();



        console.log(`✅ Topics created: ${createdTopics}`);
        console.log(`✅ Nodes created: ${createdNodes}`);
        console.log('🎉 База успішно ініціалізована');
        process.exit(0);

    } catch (e) {
        console.error('❌ Init error:', e);
        process.exit(1);
    }
}

initDb();
