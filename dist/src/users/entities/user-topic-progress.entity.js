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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTopicProgress = void 0;
const typeorm_1 = require("typeorm");
let UserTopicProgress = class UserTopicProgress {
};
exports.UserTopicProgress = UserTopicProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserTopicProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_uid', type: 'varchar' }),
    __metadata("design:type", String)
], UserTopicProgress.prototype, "userUid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'topic_id', type: 'int' }),
    __metadata("design:type", Number)
], UserTopicProgress.prototype, "topicId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'not-started' }),
    __metadata("design:type", String)
], UserTopicProgress.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], UserTopicProgress.prototype, "progress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], UserTopicProgress.prototype, "completed_at", void 0);
exports.UserTopicProgress = UserTopicProgress = __decorate([
    (0, typeorm_1.Entity)('user_topic_progress')
], UserTopicProgress);
//# sourceMappingURL=user-topic-progress.entity.js.map