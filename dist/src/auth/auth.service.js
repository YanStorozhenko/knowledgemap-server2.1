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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_auth_service_1 = require("../user-auth/user.auth.service");
const users_service_1 = require("../users/users.service");
const user_entity_1 = require("../users/entities/user.entity");
let AuthService = class AuthService {
    constructor(jwtService, userService, userAuthService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.userAuthService = userAuthService;
    }
    async createAdmin() {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminName = process.env.ADMIN_NAME || 'Admin';
        if (!adminEmail) {
            throw new Error('ADMIN_EMAIL не встановлено у .env');
        }
        const existingAdmin = await this.userAuthService.findUserByEmail(adminEmail);
        if (existingAdmin) {
            return { message: 'Адміністратор вже існує' };
        }
        const newAdmin = await this.userService.create({
            email: adminEmail,
            name: adminName,
            role: user_entity_1.UserRole.ADMIN,
        });
        return newAdmin;
    }
    async validateUser(email, password) {
        throw new common_1.UnauthorizedException('Парольна авторизація вимкнена.');
    }
    async validateUserByJwt(payload) {
        return this.userService.findPublicUserById(payload.sub);
    }
    async login(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        user_auth_service_1.UserAuthService])
], AuthService);
//# sourceMappingURL=auth.service.js.map