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
exports.FirebaseAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("../firebase-admin");
const users_service_1 = require("../users/users.service");
let FirebaseAuthGuard = class FirebaseAuthGuard {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Missing token');
        }
        const token = authHeader.split(' ')[1];
        try {
            const decodedToken = await firebase_admin_1.admin.auth().verifyIdToken(token);
            const user = await this.usersService.findByFirebaseUid(decodedToken.uid);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            req.user = {
                uid: decodedToken.uid,
                role: user.role,
            };
            console.log('✅ FirebaseAuthGuard set req.user:', req.user);
            return true;
        }
        catch (err) {
            console.error('Firebase token verification failed:', err);
            throw new common_1.UnauthorizedException('Invalid Firebase token');
        }
    }
};
exports.FirebaseAuthGuard = FirebaseAuthGuard;
exports.FirebaseAuthGuard = FirebaseAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], FirebaseAuthGuard);
//# sourceMappingURL=firebase-auth.guard.js.map