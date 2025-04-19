import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ICreateBooking, ICreateBookingResponse, IFindAllBookingsResponse, IFindBookingByIdResponse, IFindBookingByUserIdResponse } from 'src/database/booking/booking.imterface';
import { BookingRepository } from 'src/database/booking/booking.repository';
import { RoomRepository } from 'src/database/room/room.repository';
import { UserRepository } from 'src/database/user/user.repository';

@Injectable()
export class BookingsService {
    constructor(private readonly bookingRepository: BookingRepository,
        private readonly userRepository: UserRepository,
        private readonly roomRepository: RoomRepository
    ) { }

    async createBooking(data: ICreateBooking): Promise<ICreateBookingResponse> {
        const { userId, roomId, startTime, endTime } = data;

        const existingUser = await this.userRepository.findUserById(userId);

        if (!existingUser) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        const existingRoom = await this.roomRepository.findRoomById(roomId);

        if (!existingRoom) {
            throw new NotFoundException(`Room with id ${roomId} not found`);
        }

        if (startTime >= endTime) {
            throw new BadRequestException('Start time must be before end time');
        }

        const overlapping = await this.bookingRepository.findOverlapping({
            roomId,
            startTime,
            endTime,
        });

        if (overlapping) {
            throw new ConflictException('Room already booked for this time slot');
        }

        const newBookingEntity = {
            userId,
            roomId,
            startTime,
            endTime,
        };

        return this.bookingRepository.createBooking(newBookingEntity);
    }

    async findAllBookings(): Promise<IFindAllBookingsResponse[]> {
        const booking = await this.bookingRepository.findAllBookings();

        const now = new Date();

        const upcomingBookings = booking.filter(
            booking => booking.endTime > now,
        );

        return upcomingBookings.map(booking => ({
            id: booking.id,
            userId: booking.user.id,
            roomId: booking.room.id,
            startTime: booking.startTime,
            endTime: booking.endTime,
        }));
    }

    async findBookingById(id: number): Promise<IFindBookingByIdResponse> {
        const booking = await this.bookingRepository.findBookingById(id);

        if (!booking) {
            throw new NotFoundException(`Booking with id ${id} not found`);
        }

        return {
            id: booking.id,
            userId: booking.user.id,
            roomId: booking.room.id,
            startTime: booking.startTime,
            endTime: booking.endTime,
        };
    }

    async findMyBookings(userId: number): Promise<IFindBookingByUserIdResponse[]> {
        const bookings = await this.bookingRepository.findByUserId(userId);

        return bookings.map(booking => ({
            id: booking.id,
            userId: booking.user.id,
            roomId: booking.room.id,
            startTime: booking.startTime,
            endTime: booking.endTime,
        }));
    }


    async deleteBookingById(id: number, userId: number): Promise<void> {
        const booking = await this.bookingRepository.findBookingById(id);

        if (!booking) {
            throw new NotFoundException(`Booking with id ${id} not found`);
        }

        if (booking.user.id !== userId) {
            throw new ForbiddenException('You can only delete your own bookings');
        }

        await this.bookingRepository.deleteById(id);
    }

    async deleteBookingByIdAdmin(id: number): Promise<void> {
        const booking = await this.bookingRepository.findBookingById(id);

        if (!booking) {
            throw new NotFoundException(`Booking with id ${id} not found`);
        }

        await this.bookingRepository.deleteByIdAdmin(id);
    }
}
