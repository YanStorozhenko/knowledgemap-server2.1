import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    registerAdmin(): Promise<any>;
    getProtected(req: Request): {
        message: string;
        user: Express.User | undefined;
    };
    register(createUserDto: CreateUserDto): Promise<import("../users/entities/user.entity").User>;
}
