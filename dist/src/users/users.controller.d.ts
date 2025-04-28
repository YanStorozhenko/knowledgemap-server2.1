import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(req: Request): Promise<import("./entities/user.entity").User[]>;
    getUsers(req: Request): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<{
        message: string;
    }>;
    search(name?: string, email?: string, role?: string, page?: string, limit?: string, sortBy?: string, sortOrder?: string): Promise<{
        data: import("./entities/user.entity").User[];
        total: number;
        page: number;
        limit: number;
    }>;
}
