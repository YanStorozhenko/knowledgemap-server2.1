import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserAuthService } from '../user-auth/user.auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    private readonly userAuthService;
    constructor(jwtService: JwtService, userService: UsersService, userAuthService: UserAuthService);
    createAdmin(): Promise<any>;
    validateUser(email: string, password: string): Promise<User>;
    validateUserByJwt(payload: JwtPayload): Promise<Pick<User, 'id' | 'email' | 'role'> | null>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    private comparePasswords;
    saveUserPassword(password: string): Promise<string>;
}
