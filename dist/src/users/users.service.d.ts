import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findByFirebaseUid(uid: string): Promise<Pick<User, 'email' | 'name' | 'role'>>;
    findUserForAuth(email: string): Promise<User | null>;
    search(query: any): Promise<{
        data: User[];
        total: number;
        page: number;
        limit: number;
    }>;
}
