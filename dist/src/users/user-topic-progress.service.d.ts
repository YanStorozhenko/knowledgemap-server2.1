import { Repository } from 'typeorm';
import { UserTopicProgress } from './entities/user-topic-progress.entity';
import { CreateUserTopicProgressDto } from './dtos/create-user-topic-progress.dto';
import { UpdateUserTopicProgressDto } from './dtos/update-user-topic-progress.dto';
import { Topic } from '../topics/entities/topic.entity';
export declare class UserTopicProgressService {
    private repo;
    private topicRepo;
    constructor(repo: Repository<UserTopicProgress>, topicRepo: Repository<Topic>);
    findAll(): Promise<UserTopicProgress[]>;
    findByUser(userUid: string): Promise<UserTopicProgress[]>;
    create(data: CreateUserTopicProgressDto): Promise<UserTopicProgress>;
    update(id: number, data: UpdateUserTopicProgressDto): Promise<UserTopicProgress | null>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
