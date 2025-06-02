import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';
export declare class TopicsService {
    private readonly topicRepository;
    constructor(topicRepository: Repository<Topic>);
    findAll(): Promise<Topic[]>;
    findOne(id: number): Promise<Topic>;
    create(dto: CreateTopicDto): Promise<Topic>;
    update(id: number, dto: UpdateTopicDto): Promise<Topic>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
