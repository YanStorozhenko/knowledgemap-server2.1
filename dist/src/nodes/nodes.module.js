"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nodes_controller_1 = require("./nodes.controller");
const nodes_service_1 = require("./nodes.service");
const node_entity_1 = require("./entities/node.entity");
const topic_entity_1 = require("../topics/entities/topic.entity");
const node_connection_entity_1 = require("../node-connections/entities/node-connection.entity");
const user_topic_progress_entity_1 = require("../users/entities/user-topic-progress.entity");
let NodesModule = class NodesModule {
};
exports.NodesModule = NodesModule;
exports.NodesModule = NodesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                node_entity_1.Node,
                topic_entity_1.Topic,
                node_connection_entity_1.NodeConnection,
                user_topic_progress_entity_1.UserTopicProgress,
            ]),
        ],
        controllers: [nodes_controller_1.NodesController],
        providers: [nodes_service_1.NodesService],
    })
], NodesModule);
//# sourceMappingURL=nodes.module.js.map