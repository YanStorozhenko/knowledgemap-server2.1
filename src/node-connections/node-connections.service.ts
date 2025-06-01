import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NodeConnection } from './entities/node-connection.entity';
import { CreateNodeConnectionDto } from './dto/create-node-connection.dto';

@Injectable()
export class NodeConnectionsService {
    constructor(
        @InjectRepository(NodeConnection)
        private readonly repo: Repository<NodeConnection>,
    ) {}

    async findAll(): Promise<NodeConnection[]> {
        return this.repo.find();
    }

    async findOne(id: number): Promise<NodeConnection> {
        const item = await this.repo.findOneBy({ id });
        if (!item) throw new NotFoundException(`Зв’язок з id=${id} не знайдено`);
        return item;
    }

    async create(dto: CreateNodeConnectionDto): Promise<NodeConnection> {
        const entity = this.repo.create(dto);
        return this.repo.save(entity);
    }

    async update(id: number, dto: CreateNodeConnectionDto): Promise<NodeConnection> {
        const entity = await this.findOne(id);
        Object.assign(entity, dto);
        return this.repo.save(entity);
    }

    async remove(id: number): Promise<void> {
        await this.repo.delete(id);
    }
}
