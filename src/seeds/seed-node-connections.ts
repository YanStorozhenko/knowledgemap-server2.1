import { AppDataSource } from '../data-source';
import { Node } from '../nodes/entities/node.entity';
import { NodeConnection } from '../node-connections/entities/node-connection.entity';
import * as fs from 'fs';
import * as path from 'path';

export async function seedNodeConnections() {
    const connectionRepo = AppDataSource.getRepository(NodeConnection);
    const nodeRepo = AppDataSource.getRepository(Node);

    const filePath = path.join(__dirname, './node_connections_seed.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const connections = JSON.parse(raw) as { from: string; to: string }[];

    // Читання всіх вузлів у мапу
    const allNodes = await nodeRepo.find();
    const nodeMap = new Map(allNodes.map(node => [node.title, node]));

    let created = 0;

    for (const { from, to } of connections) {
        const fromNode = nodeMap.get(from);
        const toNode = nodeMap.get(to);

        if (fromNode && toNode) {
            const exists = await connectionRepo.findOneBy({
                fromNodeId: fromNode.id,

                toNodeId: toNode.id
            });

            if (!exists) {
                const conn = connectionRepo.create({
                    fromNodeId: fromNode.id,
                    toNodeId: toNode.id,
                    type: 'requires',
                });

                await connectionRepo.save(conn);
                created++;
            }
        } else {
            console.warn(`⛔ Не знайдено вузол: ${!fromNode ? `"${from}"` : ''} ${!toNode ? `"${to}"` : ''}`);
        }
    }

    console.log(`🔗 Зв’язків створено: ${created}`);
}
