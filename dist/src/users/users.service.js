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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        if (createUserDto.email) {
            const existingUser = await this.findByEmail(createUserDto.email);
            if (existingUser) {
                throw new common_1.ConflictException(`Користувач з email ${createUserDto.email} вже існує.`);
            }
        }
        const newUser = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(newUser);
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`Користувача з ID ${id} не знайдено.`);
        }
        return user;
    }
    async findPublicUserById(id) {
        return this.usersRepository.findOne({
            where: { id },
            select: ['id', 'email', 'role'],
        });
    }
    async findByEmail(email) {
        return await this.usersRepository.findOne({ where: { email } });
    }
    async findByFirebaseUid(uid) {
        return await this.usersRepository.findOne({ where: { firebase_uid: uid } });
    }
    async findUserForAuth(email) {
        return this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'role', 'name'],
        });
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        await this.usersRepository.update(id, updateUserDto);
        return this.findOne(id);
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.usersRepository.delete(id);
        return { message: `Користувач ${user.email} успішно видалений.` };
    }
    async search(query) {
        const where = {};
        if (query.name) {
            where.name = (0, typeorm_2.ILike)(`%${query.name}%`);
        }
        if (query.email) {
            where.email = (0, typeorm_2.ILike)(`%${query.email}%`);
        }
        if (query.role) {
            where.role = query.role;
        }
        const page = query.page ? Math.max(1, Number(query.page)) : 1;
        const limit = query.limit ? Math.max(1, Number(query.limit)) : 10;
        const skip = (page - 1) * limit;
        const sortBy = query.sortBy || 'id';
        const sortOrder = query.sortOrder === 'DESC' ? 'DESC' : 'ASC';
        const [data, total] = await this.usersRepository.findAndCount({
            where,
            order: { [sortBy]: sortOrder },
            take: limit,
            skip,
        });
        return {
            data,
            total,
            page,
            limit,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map