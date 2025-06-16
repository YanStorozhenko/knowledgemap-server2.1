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
exports.UserTopicProgressController = void 0;
const common_1 = require("@nestjs/common");
const user_topic_progress_service_1 = require("./user-topic-progress.service");
const create_user_topic_progress_dto_1 = require("./dtos/create-user-topic-progress.dto");
const update_user_topic_progress_dto_1 = require("./dtos/update-user-topic-progress.dto");
let UserTopicProgressController = class UserTopicProgressController {
    constructor(service) {
        this.service = service;
    }
    getAll() {
        return this.service.findAll();
    }
    findByUser(userUid) {
        return this.service.findByUser(userUid);
    }
    create(dto) {
        return this.service.create(dto);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.UserTopicProgressController = UserTopicProgressController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserTopicProgressController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('by-user/:userUid'),
    __param(0, (0, common_1.Param)('userUid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserTopicProgressController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_topic_progress_dto_1.CreateUserTopicProgressDto]),
    __metadata("design:returntype", void 0)
], UserTopicProgressController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_topic_progress_dto_1.UpdateUserTopicProgressDto]),
    __metadata("design:returntype", void 0)
], UserTopicProgressController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserTopicProgressController.prototype, "remove", null);
exports.UserTopicProgressController = UserTopicProgressController = __decorate([
    (0, common_1.Controller)('progress'),
    __metadata("design:paramtypes", [user_topic_progress_service_1.UserTopicProgressService])
], UserTopicProgressController);
//# sourceMappingURL=user-topic-progress.controller.js.map