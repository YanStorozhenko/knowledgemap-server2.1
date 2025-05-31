import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Node } from './entities/node.entity';
import { Topic } from '../topics/entities/topic.entity';
import { CreateNodeDto } from './dtos/create-node.dto';

@Injectable()
export class NodesService {
    constructor(
        @InjectRepository(Node)
        private readonly nodeRepository: Repository<Node>,

        @InjectRepository(Topic)
        private readonly topicRepository: Repository<Topic>,
    ) {}

    async create(dto: CreateNodeDto): Promise<Node> {
        const topic = await this.topicRepository.findOneBy({ id: dto.topicId });
        if (!topic) throw new Error('Topic not found');

        const node = this.nodeRepository.create({
            title: dto.title,
            topic,
            x: dto.x,
            y: dto.y,
            color: dto.color,
        });

        return await this.nodeRepository.save(node);
    }

    async findAll(): Promise<Node[]> {
        return this.nodeRepository.find();
    }

    async findOne(id: number): Promise<Node | null> {
        return this.nodeRepository.findOne({ where: { id } });
    }
}
