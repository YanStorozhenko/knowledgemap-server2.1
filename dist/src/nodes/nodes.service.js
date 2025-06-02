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
exports.NodesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const node_entity_1 = require("./entities/node.entity");
let NodesService = class NodesService {
    constructor(nodeRepo) {
        this.nodeRepo = nodeRepo;
    }
    async findAll() {
        return this.nodeRepo.find();
    }
    async findOne(id) {
        const node = await this.nodeRepo.findOne({ where: { id } });
        if (!node)
            throw new common_1.NotFoundException(`Node з id=${id} не знайдено`);
        return node;
    }
    async create(dto) {
        const node = this.nodeRepo.create(dto);
        return this.nodeRepo.save(node);
    }
    async update(id, dto) {
        const node = await this.findOne(id);
        Object.assign(node, dto);
        return this.nodeRepo.save(node);
    }
    async remove(id) {
        const node = await this.findOne(id);
        await this.nodeRepo.remove(node);
    }
};
exports.NodesService = NodesService;
exports.NodesService = NodesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(node_entity_1.Node)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NodesService);
//# sourceMappingURL=nodes.service.js.map