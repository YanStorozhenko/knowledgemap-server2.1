// src/users/user-topic-progress.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTopicProgress } from './entities/user-topic-progress.entity';
import { CreateUserTopicProgressDto } from './dtos/create-user-topic-progress.dto';
import { UpdateUserTopicProgressDto } from './dtos/update-user-topic-progress.dto';

@Injectable()
export class UserTopicProgressService {
    constructor(
        @InjectRepository(UserTopicProgress)
        private repo: Repository<UserTopicProgress>,
    ) {}

    findAll() {
        return this.repo.find();
    }

    findByUser(userId: number) {
        return this.repo.find({ where: { userId } });
    }

    async create(data: CreateUserTopicProgressDto) {
        const entity = this.repo.create(data);
        return this.repo.save(entity);
    }

    async update(id: number, data: UpdateUserTopicProgressDto) {
        await this.repo.update(id, data);
        return this.repo.findOneBy({ id });
    }

    async remove(id: number) {
        await this.repo.delete(id);
        return { deleted: true };
    }
}
