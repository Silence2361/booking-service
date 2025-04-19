import { UserRole } from "src/database/user/user.entity";

export class LoginResponseRto {
    access_token: string;
    role: UserRole;
    id: number;
}