"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeConnectionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const node_connections_service_1 = require("./node-connections.service");
const node_connections_controller_1 = require("./node-connections.controller");
const node_connection_entity_1 = require("./entities/node-connection.entity");
const auth_module_1 = require("../auth/auth.module");
const firebase_auth_guard_1 = require("../auth/firebase-auth.guard");
const users_module_1 = require("../users/users.module");
let NodeConnectionsModule = class NodeConnectionsModule {
};
exports.NodeConnectionsModule = NodeConnectionsModule;
exports.NodeConnectionsModule = NodeConnectionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([node_connection_entity_1.NodeConnection]), auth_module_1.AuthModule, users_module_1.UsersModule,],
        providers: [node_connections_service_1.NodeConnectionsService, firebase_auth_guard_1.FirebaseAuthGuard],
        controllers: [node_connections_controller_1.NodeConnectionsController],
    })
], NodeConnectionsModule);
//# sourceMappingURL=node-connections.module.js.map