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
exports.NodesController = void 0;
const common_1 = require("@nestjs/common");
const nodes_service_1 = require("./nodes.service");
const create_node_dto_1 = require("./dtos/create-node.dto");
const firebase_auth_guard_1 = require("../auth/firebase-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let NodesController = class NodesController {
    constructor(nodesService) {
        this.nodesService = nodesService;
    }
    findAll() {
        return this.nodesService.findAll();
    }
    findOne(id) {
        return this.nodesService.findOne(+id);
    }
    create(dto) {
        return this.nodesService.create(dto);
    }
    update(id, dto) {
        return this.nodesService.update(+id, dto);
    }
    remove(id) {
        return this.nodesService.remove(+id);
    }
};
exports.NodesController = NodesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_node_dto_1.CreateNodeDto]),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_node_dto_1.CreateNodeDto]),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NodesController.prototype, "remove", null);
exports.NodesController = NodesController = __decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Controller)('nodes'),
    __metadata("design:paramtypes", [nodes_service_1.NodesService])
], NodesController);
//# sourceMappingURL=nodes.controller.js.map