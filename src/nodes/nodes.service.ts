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
            progressMap.set(prog.topicId, prog);
            if (prog.status === 'completed') {
                completedTopicIds.add(prog.topicId);
            }
        }

        // Побудова графа: хто з ким зв’язаний (вперед і назад)
        const graphMap = new Map<number, number[]>();
        const inDegree = new Map<number, number>();
        const parentMap = new Map<number, number[]>();

        for (const node of nodes) {
            graphMap.set(node.id, []);
            inDegree.set(node.id, 0);
        }

        for (const conn of connections) {
            graphMap.get(conn.fromNodeId)!.push(conn.toNodeId);
            inDegree.set(conn.toNodeId, (inDegree.get(conn.toNodeId) || 0) + 1);

            if (!parentMap.has(conn.toNodeId)) {
                parentMap.set(conn.toNodeId, []);
            }
            parentMap.get(conn.toNodeId)!.push(conn.fromNodeId);
        }

        // Обчислення level: топологічна обробка з max(level)
        const queue: { id: number; level: number }[] = [];
        const levels = new Map<number, number>();

        for (const [id, deg] of inDegree.entries()) {
            if (deg === 0) {
                queue.push({ id, level: 0 });
                levels.set(id, 0);
            }
        }

        while (queue.length > 0) {
            const { id, level } = queue.shift()!;
            for (const next of graphMap.get(id)!) {
                const newIn = inDegree.get(next)! - 1;
                inDegree.set(next, newIn);

                const existingLevel = levels.get(next) ?? 0;
                levels.set(next, Math.max(existingLevel, level + 1));

                if (newIn === 0) {
                    queue.push({ id: next, level: levels.get(next)! });
                }
            }
        }

        // Обчислення available — якщо всі батьки completed
        const availableTopicIds = new Set<number>();
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


        // Формування результату
        return {
            nodes: nodes.map(node => {
                const progress = progressMap.get(node.topicId);
                const level = levels.get(node.id) ?? 0;

                let progressStatus: 'completed' | 'available' | 'locked' = 'locked';
                if (completedTopicIds.has(node.topicId)) {
                    progressStatus = 'completed';
                } else if (availableTopicIds.has(node.topicId)) {
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



}
