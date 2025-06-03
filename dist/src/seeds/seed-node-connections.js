"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedNodeConnections = seedNodeConnections;
const data_source_1 = require("../data-source");
const node_entity_1 = require("../nodes/entities/node.entity");
const node_connection_entity_1 = require("../node-connections/entities/node-connection.entity");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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