import { Topic } from '../../topics/entities/topic.entity';
export declare class UserTopicProgress {
    id: number;
    userUid: string;
    topic: Topic;
    status: string;
    progress: number;
    completed_at: Date | null;
}
