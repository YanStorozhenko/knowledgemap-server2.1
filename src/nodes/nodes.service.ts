import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Node } from './entities/node.entity';
import { CreateNodeDto } from './dtos/create-node.dto';

@Injectable()
export class NodesService {
    constructor(
        @InjectRepository(Node)
        private readonly nodeRepo: Repository<Node>,
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
}
