"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const user_topic_progress_entity_1 = require("./entities/user-topic-progress.entity");
const user_topic_progress_service_1 = require("./user-topic-progress.service");
const user_topic_progress_controller_1 = require("./user-topic-progress.controller");
const topic_entity_1 = require("../topics/entities/topic.entity");
const topics_module_1 = require("../topics/topics.module");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_topic_progress_entity_1.UserTopicProgress, topic_entity_1.Topic]),
            topics_module_1.TopicsModule,
        ],
        providers: [users_service_1.UsersService, user_topic_progress_service_1.UserTopicProgressService],
        controllers: [users_controller_1.UsersController, user_topic_progress_controller_1.UserTopicProgressController],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map