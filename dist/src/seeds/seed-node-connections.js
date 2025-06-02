"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedNodeConnections = seedNodeConnections;
const data_source_1 = require("../data-source");
const node_entity_1 = require("../nodes/entities/node.entity");
const node_connection_entity_1 = require("../node-connections/entities/node-connection.entity");
const fs = require("fs");
const path = require("path");
async function seedNodeConnections() {
    const connectionRepo = data_source_1.AppDataSource.getRepository(node_connection_entity_1.NodeConnection);
    const nodeRepo = data_source_1.AppDataSource.getRepository(node_entity_1.Node);
    const filePath = path.join(__dirname, './node_connections_seed.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const connections = JSON.parse(raw);
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
        }
        else {
            console.warn(`⛔ Не знайдено вузол: ${!fromNode ? `"${from}"` : ''} ${!toNode ? `"${to}"` : ''}`);
        }
    }
    console.log(`🔗 Зв’язків створено: ${created}`);
}
//# sourceMappingURL=seed-node-connections.js.map