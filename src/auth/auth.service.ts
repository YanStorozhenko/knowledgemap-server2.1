import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserAuthService } from '../user-auth/user.auth.service';
import { UsersService } from '../users/users.service';
import {User, UserRole} from '../users/entities/user.entity';


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly userAuthService: UserAuthService,
    ) {}

    async createAdmin(): Promise<any> {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD as string;
        const adminFirstName = process.env.ADMIN_FIRST_NAME;
        const adminLastName = process.env.ADMIN_LAST_NAME;


        // Перевіряємо чи вже існує адміністратор
        const existingAdmin = await this.userAuthService.findUserByEmail(adminEmail as string);

        if (existingAdmin) {
            return { message: 'Адміністратор вже існує' };
        }


        const newAdmin = await this.userService.create({
            firstName: adminFirstName as string,
            lastName: adminLastName as string,
            email: adminEmail as string,
            password: adminPassword,
            role: UserRole.ADMIN,
        });

        return newAdmin;
    }


    async validateUser(email: string, password: string) {
        const user = await this.userService.findUserForAuth(email);
        if (!user) {
            console.log('Користувача не знайдено');
            throw new UnauthorizedException('Невірний email або пароль');
        }

        const match = await this.comparePasswords(password, user.password);

        if (match) return user;

        throw new UnauthorizedException('Невірний email або пароль');
    }

    async validateUserByJwt(payload: JwtPayload): Promise<Pick<User, 'id' | 'email' | 'role'> | null> {
        return this.userService.findPublicUserById(payload.sub);
    }

    async login(user: any) {
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    private async comparePasswords(password: string, storedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, storedPassword);
    }

    async saveUserPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
}
