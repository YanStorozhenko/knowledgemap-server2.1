import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserAuthService } from '../user-auth/user.auth.service';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly userAuthService: UserAuthService,
    ) {}

    async createAdmin(): Promise<any> {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminName = process.env.ADMIN_NAME || 'Admin';

        if (!adminEmail) {
            throw new Error('ADMIN_EMAIL не встановлено у .env');
        }

        const existingAdmin = await this.userAuthService.findUserByEmail(adminEmail as string);
        if (existingAdmin) {
            return { message: 'Адміністратор вже існує' };
        }

        const newAdmin = await this.userService.create({
            email: adminEmail,
            name: adminName,
            role: UserRole.ADMIN,
        });

        return newAdmin;
    }

    // 🔒 Вимкнено, бо немає паролів
    async validateUser(email: string, password: string) {
        throw new UnauthorizedException('Парольна авторизація вимкнена.');
    }

    async validateUserByJwt(payload: JwtPayload): Promise<Pick<User, 'id' | 'email' | 'role'> | null> {
        return this.userService.findPublicUserById(payload.sub);
    }

    async login(user: User) {
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
