import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Booking } from './booking.entity';
import { IBooking, ICreateBooking, IOverlapping } from './booking.imterface';

@Injectable()
export class BookingRepository {
    constructor(
        @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
    ) { }

    async createBooking(data: ICreateBooking): Promise<IBooking> {
        const newBooking = this.bookingRepository.create({
            user: { id: data.userId },
            room: { id: data.roomId },
            startTime: data.startTime,
            endTime: data.endTime,
        });
        return this.bookingRepository.save(newBooking);
    }

    async findOverlapping(booking: IOverlapping): Promise<IBooking | null> {
        const { roomId, startTime, endTime } = booking;
        return this.bookingRepository
            .createQueryBuilder('booking')
            .where('booking.room.id = :roomId', { roomId })
            .andWhere(
                `(
              booking.startTime < :endTime AND
              booking.endTime > :startTime
            )`,
                { startTime, endTime },
            )
            .getOne();
    }



    async findByUserId(userId: number): Promise<IBooking[]> {
        return this.bookingRepository.find({
            where: { user: { id: userId } },
            order: { startTime: 'ASC' },
        });
    }

    async findAllBookings(): Promise<IBooking[]> {
        return this.bookingRepository.find({
            order: { startTime: 'ASC' },
            relations: ['user', 'room'],
        });
    }

    async findBookingById(id: number): Promise<IBooking | null> {
        return this.bookingRepository.findOne({ where: { id } });
    }

    async deleteById(id: number): Promise<void> {
        await this.bookingRepository.delete(id);
    }

    async deleteByIdAdmin(id: number): Promise<void> {
        await this.bookingRepository.delete(id);
    }
}