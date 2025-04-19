import { UserRole } from "src/database/user/user.entity";

export interface JwtPayload {
    userId: number;
    role: UserRole;
}

export interface IValidatedUser {
    id: number;
    role: UserRole;
}