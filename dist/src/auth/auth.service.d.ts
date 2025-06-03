import { UsersService } from '../users/users.service';
import { UserAuthService } from '../user-auth/user.auth.service';
export declare class AuthService {
    private readonly userService;
    private readonly userAuthService;
    constructor(userService: UsersService, userAuthService: UserAuthService);
    createAdmin(): Promise<any>;
}
