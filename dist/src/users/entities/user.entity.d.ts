export declare enum UserRole {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student",
    GUEST = "guest"
}
export declare class User {
    id: number;
    firebase_uid?: string;
    email: string;
    name?: string;
    avatarUrl?: string;
    role: UserRole;
    createdAt: Date;
}
