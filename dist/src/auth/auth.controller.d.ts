import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginUserDto } from '../users/dtos/login-user.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    registerAdmin(): Promise<any>;
    getProtected(req: any): {
        message: string;
        user: any;
    };
    loginAdmin(): Promise<{
        access_token: string;
    } | {
        message: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
    login(body: LoginUserDto): Promise<{
        access_token: string;
    }>;
}
