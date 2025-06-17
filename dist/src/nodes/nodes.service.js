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
    async getGraph(userUid) {
        const nodes = await this.nodeRepo.find();
        const connections = await this.connectionRepo.find();
        const progresses = await this.progressRepo.find({
            where: { userUid },
        });
        const progressMap = new Map();
        const completedTopicIds = new Set();
        for (const prog of progresses) {
            progressMap.set(prog.topicId, prog);
            if (prog.status === 'completed') {
                completedTopicIds.add(prog.topicId);
            }
        }
        const graphMap = new Map();
        const inDegree = new Map();
        const parentMap = new Map();
        for (const node of nodes) {
            graphMap.set(node.id, []);
            inDegree.set(node.id, 0);
        }
        for (const conn of connections) {
            graphMap.get(conn.fromNodeId).push(conn.toNodeId);
            inDegree.set(conn.toNodeId, (inDegree.get(conn.toNodeId) || 0) + 1);
            if (!parentMap.has(conn.toNodeId)) {
                parentMap.set(conn.toNodeId, []);
            }
            parentMap.get(conn.toNodeId).push(conn.fromNodeId);
        }
        const queue = [];
        const levels = new Map();
        for (const [id, deg] of inDegree.entries()) {
            if (deg === 0) {
                queue.push({ id, level: 0 });
                levels.set(id, 0);
            }
        }
        while (queue.length > 0) {
            const { id, level } = queue.shift();
            for (const next of graphMap.get(id)) {
                const newIn = inDegree.get(next) - 1;
                inDegree.set(next, newIn);
                const existingLevel = levels.get(next) ?? 0;
                levels.set(next, Math.max(existingLevel, level + 1));
                if (newIn === 0) {
                    queue.push({ id: next, level: levels.get(next) });
                }
            }
        }
        const availableTopicIds = new Set();
        for (const node of nodes) {
            const parents = parentMap.get(node.id) || [];
            const isCompleted = completedTopicIds.has(node.topicId);
            const hasNoParents = parents.length === 0;
            const allParentsCompleted = parents.every(parentId => {
                const parentNode = nodes.find(n => n.id === parentId);
                return parentNode && completedTopicIds.has(parentNode.topicId);
            });
            if (!isCompleted && (hasNoParents || allParentsCompleted)) {
                availableTopicIds.add(node.topicId);
            }
        }
        return {
            nodes: nodes.map(node => {
                const progress = progressMap.get(node.topicId);
                const level = levels.get(node.id) ?? 0;
                let progressStatus = 'locked';
                if (completedTopicIds.has(node.topicId)) {
                    progressStatus = 'completed';
                }
                else if (availableTopicIds.has(node.topicId)) {
                    progressStatus = 'available';
                }
                return {
                    id: node.id,
                    title: node.title,
                    topicId: node.topicId,
                    x: node.x,
                    y: node.y,
                    level,
                    progress: progress?.progress ?? 0,
                    status: progressStatus,
                };
            }),
            edges: connections.map(c => ({
                from: c.fromNodeId,
                to: c.toNodeId,
                label: c.type ?? 'unknown',
            })),
        };
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