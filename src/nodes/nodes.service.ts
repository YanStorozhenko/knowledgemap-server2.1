import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Node } from './entities/node.entity';
import { CreateNodeDto } from './dtos/create-node.dto';
import { UserTopicProgress } from '../users/entities/user-topic-progress.entity';
import { NodeConnection } from '../node-connections/entities/node-connection.entity';

type EdgeDto = {
    from: number;
    to: number;
    label?: string;
};

@Injectable()
export class NodesService {
    constructor(
        @InjectRepository(Node)
        private readonly nodeRepo: Repository<Node>,

        @InjectRepository(UserTopicProgress)
        private progressRepo: Repository<UserTopicProgress>,

        @InjectRepository(NodeConnection)
        private readonly connectionRepo: Repository<NodeConnection>,
    ) {}

    async findAll(): Promise<Node[]> {
        return this.nodeRepo.find();
    }

    async findOne(id: number): Promise<Node> {
        const node = await this.nodeRepo.findOne({ where: { id } });
        if (!node) throw new NotFoundException(`Node з id=${id} не знайдено`);
        return node;
    }

    async create(dto: CreateNodeDto): Promise<Node> {
        const node = this.nodeRepo.create(dto);
        return this.nodeRepo.save(node);
    }

    async update(id: number, dto: CreateNodeDto): Promise<Node> {
        const node = await this.findOne(id);
        Object.assign(node, dto);
        return this.nodeRepo.save(node);
    }

    async remove(id: number): Promise<void> {
        const node = await this.findOne(id);
        await this.nodeRepo.remove(node);
    }

    async getGraph(userUid: string) {
        const nodes = await this.nodeRepo.find();
        const connections = await this.connectionRepo.find();
        const progresses = await this.progressRepo.find({
            where: { userUid },
        });

        const progressMap = new Map<number, UserTopicProgress>();
        const completedTopicIds = new Set<number>();

        for (const prog of progresses) {
            const topicId = Number(prog.topicId);
            progressMap.set(topicId, prog);
            if (prog.status === 'completed') {
                completedTopicIds.add(topicId);
            }
        }

        const parentMap = new Map<number, number[]>();
        for (const conn of connections) {
            if (!parentMap.has(conn.toNodeId)) {
                parentMap.set(conn.toNodeId, []);
            }
            parentMap.get(conn.toNodeId)!.push(conn.fromNodeId);
        }

        const levels = new Map<number, number>();
        const visited = new Set<number>();
        const queue: number[] = [];

        for (const node of nodes) {
            const parents = parentMap.get(node.id) || [];
            if (parents.length === 0) {
                levels.set(node.id, 0);
                queue.push(node.id);
                visited.add(node.id);
            }
        }

        while (queue.length > 0) {
            const currentId = queue.shift()!;
            const currentLevel = levels.get(currentId)!;

            for (const conn of connections) {
                if (conn.fromNodeId === currentId) {
                    const childId = conn.toNodeId;
                    const prevLevel = levels.get(childId) ?? 0;
                    levels.set(childId, Math.max(prevLevel, currentLevel + 1));

                    if (!visited.has(childId)) {
                        queue.push(childId);
                        visited.add(childId);
                    }
                }
            }
        }

        const availableTopicIds = new Set<number>();
        for (const node of nodes) {
            const parents = parentMap.get(node.id) || [];
            const isCompleted = completedTopicIds.has(Number(node.topicId));
            const hasNoParents = parents.length === 0;

            const allParentsCompleted = parents.every(parentId => {
                const parentNode = nodes.find(n => n.id === parentId);
                return parentNode && completedTopicIds.has(Number(parentNode.topicId));
            });

            if (!isCompleted && (hasNoParents || allParentsCompleted)) {
                availableTopicIds.add(Number(node.topicId));
            }
        }

        return {
            nodes: nodes.map(node => {
                const topicId = Number(node.topicId);
                const progress = progressMap.get(topicId);
                const level = levels.get(node.id) ?? 0;

                let progressStatus: 'completed' | 'available' | 'locked' = 'locked';
                if (completedTopicIds.has(topicId)) {
                    progressStatus = 'completed';
                } else if (availableTopicIds.has(topicId)) {
                    progressStatus = 'available';
                }

                return {
                    id: node.id,
                    title: node.title,
                    topicId: topicId,
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
}
