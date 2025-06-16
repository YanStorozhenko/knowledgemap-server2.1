import { UserTopicProgressService } from './user-topic-progress.service';
import { CreateUserTopicProgressDto } from './dtos/create-user-topic-progress.dto';
import { UpdateUserTopicProgressDto } from './dtos/update-user-topic-progress.dto';
export declare class UserTopicProgressController {
    private readonly service;
    constructor(service: UserTopicProgressService);
    getAll(): Promise<import("./entities/user-topic-progress.entity").UserTopicProgress[]>;
    findByUser(userUid: string): Promise<import("./entities/user-topic-progress.entity").UserTopicProgress[]>;
    create(dto: CreateUserTopicProgressDto): Promise<import("./entities/user-topic-progress.entity").UserTopicProgress>;
    update(id: number, dto: UpdateUserTopicProgressDto): Promise<import("./entities/user-topic-progress.entity").UserTopicProgress | null>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
