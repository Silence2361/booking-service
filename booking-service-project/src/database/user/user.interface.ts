import { UserRole } from "./user.entity";

export interface IUser {
    id: number;
    email: string;
    name: string;
    password: string;
    role: UserRole;
}

export interface ICreateUser {
    email: string;
    name: string;
    password: string;
    role: UserRole;
}

export interface ICreateUserResponse {
    id: number;
}

export interface IFindUserByIdResponse {
    id: number;
    email: string;
    name: string;
    role: UserRole;
}

export interface IFindAllUsersResponse {
    id: number;
    email: string;
    name: string;
    role: UserRole;
}

export interface IUpdateUser {
    email?: string;
    name?: string;
    password?: string;
    role?: UserRole;
}