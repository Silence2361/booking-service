import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserRepository } from './user/user.repository';
import { Room } from './room/room.entity';
import { RoomRepository } from './room/room.repository';
import { Booking } from './booking/booking.entity';
import { BookingRepository } from './booking/booking.repository';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User, Room, Booking])],
    providers: [UserRepository, RoomRepository, BookingRepository],
    exports: [UserRepository, RoomRepository, BookingRepository]
})
export class DatabaseModule { }
