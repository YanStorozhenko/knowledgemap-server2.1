import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findPublicUserById(id: number): Promise<Pick<User, 'id' | 'email' | 'role'> | null>;
    findByEmail(email: string): Promise<User | null>;
    findUserForAuth(email: string): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<{
        message: string;
    }>;
    search(query: any): Promise<{
        data: User[];
        total: number;
        page: number;
        limit: number;
    }>;
}
