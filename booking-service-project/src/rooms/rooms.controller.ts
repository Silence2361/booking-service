import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomResponseRto } from './rto/create-room-response.rto';
import { CreateRoomDto } from './dto/create-room.dto';
import { FindByRoomNumberResponserRto } from './rto/find-by-room-number-response.rto';
import { UpdateRoomByIdDto } from './dto/update-room-by-id.dto';
import { FindRoomByIdResponseRto } from './rto/find-room-by-id-response.rto';
import { FindAllRoomsResponseRto } from './rto/find-all-rooms-response.rto';
import { FindRoomsQueryDto } from './dto/find-rooms-query.dto';
import { RolesGuard } from 'src/third-party/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/database/user/user.entity';
import { JwtAuthGuard } from 'src/third-party/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) { }

    @Post()
    @Roles(UserRole.ADMIN)
    async createRoom(@Body() data: CreateRoomDto): Promise<CreateRoomResponseRto> {
        return this.roomsService.createRoom(data);
    }


    @Get("room/:roomNumber")
    @Roles(UserRole.USER, UserRole.ADMIN)
    async findByRoomNumber(@Param("roomNumber") roomNumber: number): Promise<FindByRoomNumberResponserRto> {
        return this.roomsService.findByRoomNumber(roomNumber);
    }

    @Get(":id")
    @Roles(UserRole.USER, UserRole.ADMIN)
    async findByRoomId(@Param("id") id: number): Promise<FindRoomByIdResponseRto> {
        return this.roomsService.findRoomById(id);
    }
    //все выводить и тру и фолс
    @Get()
    @Roles(UserRole.USER, UserRole.ADMIN)
    async findAllStatusRooms(
        @Query() query: FindRoomsQueryDto,
    ): Promise<FindAllRoomsResponseRto[]> {
        return this.roomsService.findAllByStatusQuery(query.active);
    }

    @Put(":id")
    @Roles(UserRole.ADMIN)
    async updateRoomById(@Param("id") id: number, @Body() data: UpdateRoomByIdDto): Promise<void> {
        await this.roomsService.updateRoomById(id, data);
    }

    @Patch("activate/:id")
    @Roles(UserRole.ADMIN)
    async activateRoomById(@Param("id") id: number): Promise<void> {
        await this.roomsService.activateRoomById(id);
    }

    @Patch("deactivate/:id")
    @Roles(UserRole.ADMIN)
    async deactivateRoomById(@Param("id") id: number): Promise<void> {
        await this.roomsService.deactivateRoomById(id);
    }

    @Delete(":id")
    @Roles(UserRole.ADMIN)
    async deleteRoomById(@Param("id") id: number): Promise<void> {
        await this.roomsService.deleteRoomById(id);
    }
}
