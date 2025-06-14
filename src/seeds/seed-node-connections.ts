import { AppDataSource } from '../data-source';
import { Node } from '../nodes/entities/node.entity';
import { NodeConnection } from '../node-connections/entities/node-connection.entity';
import * as fs from 'fs';
import * as path from 'path';

function normalize(title: string): string {
    return title.trim().toLowerCase().replace(/[’']/g, "'");
}

export async function seedNodeConnections() {
    const connectionRepo = AppDataSource.getRepository(NodeConnection);
    const nodeRepo = AppDataSource.getRepository(Node);

    const filePath = path.join(__dirname, './node_connections_seed.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const connections = JSON.parse(raw) as { from: string; to: string }[];

    // Отримуємо наявні вузли
    const allNodes = await nodeRepo.find();
    const nodeMap = new Map(allNodes.map(node => [normalize(node.title), node]));

    let createdNodes = 0;
    let createdConnections = 0;

    for (const { from, to } of connections) {
        let fromNode = nodeMap.get(normalize(from));
        let toNode = nodeMap.get(normalize(to));

        // Якщо вузли відсутні — створити їх
        if (!fromNode) {
            fromNode = nodeRepo.create({ title: from });
            await nodeRepo.save(fromNode);
            nodeMap.set(normalize(from), fromNode);
            createdNodes++;
        }

        if (!toNode) {
            toNode = nodeRepo.create({ title: to });
            await nodeRepo.save(toNode);
            nodeMap.set(normalize(to), toNode);
            createdNodes++;
        }

        // Створити зв’язок, якщо його ще нема
        const exists = await connectionRepo.findOneBy({
            fromNodeId: fromNode.id,
            toNodeId: toNode.id,
        });

        if (!exists) {
            const conn = connectionRepo.create({
                fromNodeId: fromNode.id,
                toNodeId: toNode.id,
                type: '',
            });

            await connectionRepo.save(conn);
            createdConnections++;
        }
    }

    console.log(`📌 Додано нових вузлів: ${createdNodes}`);
    console.log(`🔗 Створено зв’язків: ${createdConnections}`);
}
