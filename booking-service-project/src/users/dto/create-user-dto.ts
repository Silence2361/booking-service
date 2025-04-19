import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { UserRole } from 'src/database/user/user.entity';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(16)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(28)
    password: string;

    @IsEnum(UserRole)
    role: UserRole;
}