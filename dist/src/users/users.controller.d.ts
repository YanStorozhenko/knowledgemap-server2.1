import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(req: Request): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<{
        message: string;
    }>;
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    saveAfterGoogleLogin(body: {
        firebase_uid: string;
        email: string;
        name: string;
        avatarUrl?: string;
    }): Promise<import("./entities/user.entity").User>;
    search(name?: string, email?: string, role?: string, page?: string, limit?: string, sortBy?: string, sortOrder?: string): Promise<{
        data: import("./entities/user.entity").User[];
        total: number;
        page: number;
        limit: number;
    }>;
}
