// src/users/dtos/create-user-topic-progress.dto.ts
export class CreateUserTopicProgressDto {
    userId: number;
    topicId: number;
    isCompleted?: boolean;
}
