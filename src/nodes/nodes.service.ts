import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Node } from './entities/node.entity';
import { CreateNodeDto } from './dtos/create-node.dto';


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



    ///////////graph

    async getGraph(): Promise<{ nodes: (Node & { level: number })[]; edges: EdgeDto[] }> {
        const allNodes = await this.nodeRepo.find();
        const allConnections = await this.connectionRepo.find();

        // Зібрати всі вузли, які беруть участь у з'єднаннях
        const usedNodeIds = new Set<number>();
        for (const conn of allConnections) {
            if (
                Number.isInteger(conn.fromNodeId) &&
                Number.isInteger(conn.toNodeId)
            ) {
                usedNodeIds.add(conn.fromNodeId);
                usedNodeIds.add(conn.toNodeId);
            }
        }

        // Залишаємо лише коректні вузли, які реально використовуються
        const nodes = allNodes.filter(n =>
            Number.isInteger(n.id) && usedNodeIds.has(n.id)
        );

        const validNodeIds = new Set(nodes.map(n => n.id));
        const inDegree = new Map<number, number>();
        const graph = new Map<number, number[]>();

        for (const node of nodes) {
            inDegree.set(node.id, 0);
            graph.set(node.id, []);
        }

        for (const conn of allConnections) {
            const { fromNodeId, toNodeId } = conn;

            if (
                !Number.isInteger(fromNodeId) ||
                !Number.isInteger(toNodeId) ||
                !validNodeIds.has(fromNodeId) ||
                !validNodeIds.has(toNodeId)
            ) {
                console.warn(`⚠️ Пропущено з’єднання: ${fromNodeId} → ${toNodeId}`);
                continue;
            }

            graph.get(fromNodeId)!.push(toNodeId);
            inDegree.set(toNodeId, (inDegree.get(toNodeId) || 0) + 1);
        }

        const queue: { id: number; level: number }[] = [];
        const levels = new Map<number, number>();
        let processedNodes = 0;

        for (const [id, deg] of inDegree.entries()) {
            if (deg === 0) {
                queue.push({ id, level: 0 });
                levels.set(id, 0);
            }
        }

        while (queue.length > 0) {
            const { id, level } = queue.shift()!;
            processedNodes++;
            for (const next of graph.get(id)!) {
                const newInDegree = inDegree.get(next)! - 1;
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
            .filter(n => levels.has(n.id)) // лише вузли, які вдалося обробити
            .map(n => ({
                ...n,
                level: levels.get(n.id)!,
            }));

        const edges: EdgeDto[] = allConnections
            .filter(c =>
                Number.isInteger(c.fromNodeId) &&
                Number.isInteger(c.toNodeId) &&
                validNodeIds.has(c.fromNodeId) &&
                validNodeIds.has(c.toNodeId)
            )
            .map(c => ({
                from: c.fromNodeId,
                to: c.toNodeId,
                label: c.type ?? 'unknown',
            }));

        return { nodes: rankedNodes, edges };
    }




}
