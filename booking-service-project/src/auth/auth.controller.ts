import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration-dto';
import { RegistrationResponseRto } from './rto/registration-response.rto';
import { LoginDto } from './dto/login-dto';
import { LoginResponseRto } from './rto/login-response.rto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async registration(
        @Body() registrationDto: RegistrationDto,
    ): Promise<RegistrationResponseRto> {
        return this.authService.register(registrationDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseRto> {
        return this.authService.login(loginDto);
    }
}