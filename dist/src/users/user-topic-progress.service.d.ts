import { Repository } from 'typeorm';
import { UserTopicProgress } from './entities/user-topic-progress.entity';
import { CreateUserTopicProgressDto } from './dtos/create-user-topic-progress.dto';
import { UpdateUserTopicProgressDto } from './dtos/update-user-topic-progress.dto';
export declare class UserTopicProgressService {
    private repo;
    constructor(repo: Repository<UserTopicProgress>);
    findAll(): Promise<UserTopicProgress[]>;
    findByUser(userUid: string): Promise<UserTopicProgress[]>;
    findProgressForUserByNodeIds(userUid: string, topicIds: number[]): Promise<UserTopicProgress[]>;
    create(data: CreateUserTopicProgressDto): Promise<UserTopicProgress>;
    update(id: number, data: UpdateUserTopicProgressDto): Promise<UserTopicProgress | null>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
