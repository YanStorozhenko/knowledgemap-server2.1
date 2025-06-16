import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTopicProgress } from './entities/user-topic-progress.entity';
import { CreateUserTopicProgressDto } from './dtos/create-user-topic-progress.dto';
import { UpdateUserTopicProgressDto } from './dtos/update-user-topic-progress.dto';
import { InjectRepository as InjectTopicRepo } from '@nestjs/typeorm';
import { Topic } from '../topics/entities/topic.entity';

@Injectable()
export class UserTopicProgressService {
    constructor(
        @InjectRepository(UserTopicProgress)
        private repo: Repository<UserTopicProgress>,

        @InjectRepository(Topic)
        private topicRepo: Repository<Topic>,
    ) {}

    findAll() {
        return this.repo.find({ relations: ['topic'] }); // 🔹 user більше не існує
    }

    findByUser(userUid: string) {
        return this.repo.find({
            where: { userUid },
            relations: ['topic'], // 🔹 тільки topic
        });
    }

    async create(data: CreateUserTopicProgressDto) {
        const topic = await this.topicRepo.findOne({ where: { id: data.topicId } });
        if (!topic) throw new Error('Topic not found');

        const entity = this.repo.create({
            userUid: data.userUid,
            topic,
            status: data.status ?? 'not-started',
            progress: data.progress ?? 0,
            completed_at: data.completed_at ?? undefined,
        });

        return this.repo.save(entity);
    }

    async update(id: number, data: UpdateUserTopicProgressDto) {
        await this.repo.update(id, {
            ...data,
        });
        return this.repo.findOne({ where: { id }, relations: ['topic'] }); // 🔹 user прибрано
    }

    async remove(id: number) {
        await this.repo.delete(id);
        return { deleted: true };
    }
}
