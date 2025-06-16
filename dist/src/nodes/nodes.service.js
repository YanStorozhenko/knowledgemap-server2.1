"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const node_entity_1 = require("./entities/node.entity");
const user_topic_progress_entity_1 = require("../users/entities/user-topic-progress.entity");
const node_connection_entity_1 = require("../node-connections/entities/node-connection.entity");
let NodesService = class NodesService {
    constructor(nodeRepo, progressRepo, connectionRepo) {
        this.nodeRepo = nodeRepo;
        this.progressRepo = progressRepo;
        this.connectionRepo = connectionRepo;
    }
    async findAll() {
        return this.nodeRepo.find();
    }
    async findOne(id) {
        const node = await this.nodeRepo.findOne({ where: { id } });
        if (!node)
            throw new common_1.NotFoundException(`Node з id=${id} не знайдено`);
        return node;
    }
    async create(dto) {
        const node = this.nodeRepo.create(dto);
        return this.nodeRepo.save(node);
    }
    async update(id, dto) {
        const node = await this.findOne(id);
        Object.assign(node, dto);
        return this.nodeRepo.save(node);
    }
    async remove(id) {
        const node = await this.findOne(id);
        await this.nodeRepo.remove(node);
    }
    async getGraph() {
        const allNodes = await this.nodeRepo.find();
        const allConnections = await this.connectionRepo.find();
        const usedNodeIds = new Set();
        for (const conn of allConnections) {
            if (Number.isInteger(conn.fromNodeId) &&
                Number.isInteger(conn.toNodeId)) {
                usedNodeIds.add(conn.fromNodeId);
                usedNodeIds.add(conn.toNodeId);
            }
        }
        const nodes = allNodes.filter(n => Number.isInteger(n.id) && usedNodeIds.has(n.id));
        const validNodeIds = new Set(nodes.map(n => n.id));
        const inDegree = new Map();
        const graph = new Map();
        for (const node of nodes) {
            inDegree.set(node.id, 0);
            graph.set(node.id, []);
        }
        for (const conn of allConnections) {
            const { fromNodeId, toNodeId } = conn;
            if (!Number.isInteger(fromNodeId) ||
                !Number.isInteger(toNodeId) ||
                !validNodeIds.has(fromNodeId) ||
                !validNodeIds.has(toNodeId)) {
                console.warn(`⚠️ Пропущено з’єднання: ${fromNodeId} → ${toNodeId}`);
                continue;
            }
            graph.get(fromNodeId).push(toNodeId);
            inDegree.set(toNodeId, (inDegree.get(toNodeId) || 0) + 1);
        }
        const queue = [];
        const levels = new Map();
        let processedNodes = 0;
        for (const [id, deg] of inDegree.entries()) {
            if (deg === 0) {
                queue.push({ id, level: 0 });
                levels.set(id, 0);
            }
        }
        while (queue.length > 0) {
            const { id, level } = queue.shift();
            processedNodes++;
            for (const next of graph.get(id)) {
                const newInDegree = inDegree.get(next) - 1;
                inDegree.set(next, newInDegree);
                if (newInDegree === 0) {
                    queue.push({ id: next, level: level + 1 });
                    levels.set(next, level + 1);
                }
            }
        }
        if (processedNodes < nodes.length) {
            const unprocessed = nodes.filter(n => !levels.has(n.id));
            console.warn('⚠️ Деякі вузли не оброблені (можливо цикл):', unprocessed.map(n => n.id));
        }
        const rankedNodes = nodes
            .filter(n => levels.has(n.id))
            .map(n => ({
            ...n,
            level: levels.get(n.id),
        }));
        const edges = allConnections
            .filter(c => Number.isInteger(c.fromNodeId) &&
            Number.isInteger(c.toNodeId) &&
            validNodeIds.has(c.fromNodeId) &&
            validNodeIds.has(c.toNodeId))
            .map(c => ({
            from: c.fromNodeId,
            to: c.toNodeId,
            label: c.type ?? 'unknown',
        }));
        return { nodes: rankedNodes, edges };
    }
    async getGraphWithProgress(userUid) {
        const nodes = await this.nodeRepo.find();
        const connections = await this.connectionRepo.find();
        const progress = await this.progressRepo.find({
            where: { userUid },
        });
        const completedTopicIds = new Set(progress
            .filter(p => p.status === 'completed' && p.topic)
            .map(p => p.topic.id));
        const adjacencyMap = new Map();
        for (const conn of connections) {
            if (!adjacencyMap.has(conn.fromNodeId)) {
                adjacencyMap.set(conn.fromNodeId, []);
            }
            adjacencyMap.get(conn.fromNodeId).push(conn.toNodeId);
        }
        const availableTopicIds = new Set();
        for (const node of nodes) {
            if (completedTopicIds.has(node.topicId)) {
                const neighbors = adjacencyMap.get(node.id) || [];
                for (const neighborId of neighbors) {
                    const target = nodes.find(n => n.id === neighborId);
                    if (target)
                        availableTopicIds.add(target.topicId);
                }
            }
        }
        return nodes.map(node => {
            let status = 'locked';
            if (completedTopicIds.has(node.topicId)) {
                status = 'completed';
            }
            else if (availableTopicIds.has(node.topicId)) {
                status = 'available';
            }
            return {
                ...node,
                progressStatus: status,
            };
        });
    }
};
exports.NodesService = NodesService;
exports.NodesService = NodesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(node_entity_1.Node)),
    __param(1, (0, typeorm_1.InjectRepository)(user_topic_progress_entity_1.UserTopicProgress)),
    __param(2, (0, typeorm_1.InjectRepository)(node_connection_entity_1.NodeConnection)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], NodesService);
//# sourceMappingURL=nodes.service.js.map