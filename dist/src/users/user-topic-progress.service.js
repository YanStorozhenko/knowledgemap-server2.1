"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTopicProgressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_topic_progress_entity_1 = require("./entities/user-topic-progress.entity");
const topic_entity_1 = require("../topics/entities/topic.entity");
let UserTopicProgressService = class UserTopicProgressService {
    constructor(repo, topicRepo) {
        this.repo = repo;
        this.topicRepo = topicRepo;
    }
    findAll() {
        return this.repo.find({ relations: ['topic'] });
    }
    findByUser(userUid) {
        return this.repo.find({
            where: { userUid },
            relations: ['topic'],
        });
    }
    async create(data) {
        const topic = await this.topicRepo.findOne({ where: { id: data.topicId } });
        if (!topic)
            throw new Error('Topic not found');
        const entity = this.repo.create({
            userUid: data.userUid,
            topic,
            status: data.status ?? 'not-started',
            progress: data.progress ?? 0,
            completed_at: data.completed_at ?? undefined,
        });
        return this.repo.save(entity);
    }
    async update(id, data) {
        await this.repo.update(id, {
            ...data,
        });
        return this.repo.findOne({ where: { id }, relations: ['topic'] });
    }
    async remove(id) {
        await this.repo.delete(id);
        return { deleted: true };
    }
};
exports.UserTopicProgressService = UserTopicProgressService;
exports.UserTopicProgressService = UserTopicProgressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_topic_progress_entity_1.UserTopicProgress)),
    __param(1, (0, typeorm_2.InjectRepository)(topic_entity_1.Topic)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], UserTopicProgressService);
//# sourceMappingURL=user-topic-progress.service.js.map