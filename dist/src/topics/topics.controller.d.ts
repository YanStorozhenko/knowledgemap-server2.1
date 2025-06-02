import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';
export declare class TopicsController {
    private readonly topicsService;
    constructor(topicsService: TopicsService);
    findAll(): Promise<import("./entities/topic.entity").Topic[]>;
    findOne(id: number): Promise<import("./entities/topic.entity").Topic>;
    create(createTopicDto: CreateTopicDto): Promise<import("./entities/topic.entity").Topic>;
    update(id: number, updateTopicDto: UpdateTopicDto): Promise<import("./entities/topic.entity").Topic>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
