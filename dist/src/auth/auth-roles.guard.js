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
exports.AuthRolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("./roles.decorator");
const public_decorator_1 = require("./public.decorator");
const firebase_admin_1 = require("../firebase-admin");
const users_service_1 = require("../users/users.service");
const user_entity_1 = require("../users/entities/user.entity");
let AuthRolesGuard = class AuthRolesGuard {
    constructor(reflector, usersService) {
        this.reflector = reflector;
        this.usersService = usersService;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        console.log("authHeader---------------------------------------------");
        if (!authHeader?.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Missing token');
        }
        const token = authHeader.split(' ')[1];
        const decoded = await firebase_admin_1.admin.auth().verifyIdToken(token);
        console.log("authHeader---------------------------------------------");
        console.log('Decoded ', decoded.uid);
        let user = await this.usersService.findByFirebaseUid(decoded.uid);
        console.log('user ', user);
        if (!user) {
            user = await this.usersService.create({
                firebase_uid: decoded.uid,
                email: decoded.email,
                name: decoded.name ?? decoded.email?.split('@')[0] ?? 'No Name',
                role: user_entity_1.UserRole.STUDENT,
            });
        }
        request.user = {
            uid: decoded.uid,
            email: decoded.email,
            name: decoded.name,
            role: user.role,
        };
        console.log('Decoded user set on request:', request.user);
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (requiredRoles?.length && !requiredRoles.includes(user.role)) {
            throw new common_1.ForbiddenException('Недостатньо прав доступу');
        }
        console.log('✅ request.user =', request.user);
        return true;
    }
};
exports.AuthRolesGuard = AuthRolesGuard;
exports.AuthRolesGuard = AuthRolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        users_service_1.UsersService])
], AuthRolesGuard);
//# sourceMappingURL=auth-roles.guard.js.map