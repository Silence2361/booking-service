import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { CreateUserResponseRto } from './rto/create-user-response.rto';
import { FindAllUsersResponseRto } from './rto/find-all-users-response.rto';
import { FindUserByIdResponseRto } from './rto/find-user-by-id-response.rto';
import { UpdateUserByIdDto } from './dto/update-user-by-id.dto';
import { JwtAuthGuard } from 'src/third-party/jwt/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/third-party/guards/roles.guard';
import { UserRole } from 'src/database/user/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(
        @Body() user: CreateUserDto,
    ): Promise<CreateUserResponseRto> {
        return this.usersService.createUser(user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get()
    async findAllUsers(): Promise<FindAllUsersResponseRto[]> {
        return this.usersService.findAllUsers();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get(':id')
    async findUserById(
        @Param('id') id: number,
    ): Promise<FindUserByIdResponseRto> {
        return this.usersService.findUserById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Put(':id')
    async updateUserById(
        @Param('id') id: number,
        @Body() user: UpdateUserByIdDto,
    ): Promise<void> {
        return this.usersService.updateUserById(id, user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async deleteUserById(@Param('id') id: number): Promise<void> {
        return this.usersService.deleteUserById(id);
    }
}