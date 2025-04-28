import { UsersService } from '../users/users.service';
export declare class UserAuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    findUserByEmail(email: string): Promise<import("../users/entities/user.entity").User | null>;
}
