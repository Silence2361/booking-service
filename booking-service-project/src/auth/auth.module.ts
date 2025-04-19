import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '../third-party/jwt/jwt.module';
import { JwtStrategy } from '../third-party/jwt/jwt.strategy';


@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule { }