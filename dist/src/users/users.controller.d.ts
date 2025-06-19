import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './entities/user.entity';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    saveAfterGoogleLogin(req: Request, body: {
        email: string;
        name: string;
        avatarUrl?: string;
    }): Promise<Pick<import("./entities/user.entity").User, "email" | "name" | "role">>;
    getMe(req: Request): Promise<{
        email: string;
        name: string | undefined;
        role: UserRole;
    }>;
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    getUsers(): Promise<import("./entities/user.entity").User[]>;
    search(name?: string, email?: string, role?: string, page?: string, limit?: string, sortBy?: string, sortOrder?: string): Promise<{
        data: import("./entities/user.entity").User[];
        total: number;
        page: number;
        limit: number;
    }>;
}
