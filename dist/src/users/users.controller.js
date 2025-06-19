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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dtos/create-user.dto");
const roles_decorator_1 = require("../auth/roles.decorator");
const user_entity_1 = require("./entities/user.entity");
const swagger_1 = require("@nestjs/swagger");
const firebase_admin_1 = require("../firebase-admin");
const public_decorator_1 = require("../auth/public.decorator");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async saveAfterGoogleLogin(req, body) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token)
            throw new common_1.UnauthorizedException('No token provided');
        const decoded = await firebase_admin_1.admin.auth().verifyIdToken(token);
        const firebaseUid = decoded.uid;
        const existingUser = await this.usersService.findByFirebaseUid(firebaseUid);
        console.log("existingUser" + existingUser);
        if (existingUser)
            return existingUser;
        return this.usersService.create({
            firebase_uid: firebaseUid,
            email: body.email,
            name: body.name,
            avatarUrl: body.avatarUrl,
            role: user_entity_1.UserRole.STUDENT,
        });
    }
    async getMe(req) {
        const firebaseUid = req.user.uid;
        const user = await this.usersService.findByFirebaseUid(firebaseUid);
        if (!user) {
            throw new common_1.UnauthorizedException('Користувача не знайдено');
        }
        return {
            email: user.email,
            name: user.name,
            role: user.role,
        };
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    getUsers() {
        return this.usersService.findAll();
    }
    search(name, email, role, page, limit, sortBy, sortOrder) {
        return this.usersService.search({
            name,
            email,
            role,
            page,
            limit,
            sortBy,
            sortOrder,
        });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('save'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "saveAfterGoogleLogin", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('email')),
    __param(2, (0, common_1.Query)('role')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __param(5, (0, common_1.Query)('sortBy')),
    __param(6, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "search", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map