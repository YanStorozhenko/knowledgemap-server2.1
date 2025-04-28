export declare enum UserRole {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student",
    GUEST = "guest"
}
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    phoneNumber?: string;
    avatarUrl?: string;
    dateOfBirth?: string;
    address?: string;
    createdAt: Date;
    hashPassword(): Promise<void>;
}
