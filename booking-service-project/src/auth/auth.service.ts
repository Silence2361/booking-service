import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import {
    ILogin,
    ILoginResponse,
    IRegistration,
    IRegistrationResponse,
} from './auth.interface';
import { UserRepository } from '../database/user/user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/database/user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async register(credentials: IRegistration): Promise<IRegistrationResponse> {
        const { email, name, password } = credentials;

        const candidate = await this.userRepository.findUserByEmail(email);

        if (candidate) {
            throw new ConflictException('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userRepository.createUser({
            email,
            name,
            password: hashedPassword,
            role: UserRole.USER
        });

        return { id: user.id, email: user.email };
    }

    async login(credentials: ILogin): Promise<ILoginResponse> {
        const { email, password } = credentials;

        const user = await this.userRepository.findUserByEmail(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { userId: user.id, role: user.role };

        const access_token = await this.jwtService.signAsync(payload);

        return { access_token, role: user.role, id: user.id };
    }
}