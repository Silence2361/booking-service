import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateBookingResponseRto } from './rto/create-booking-response.rto';
import { FindAllBookingsResponseRto } from './rto/find-all-bookings-reponse.rto';
import { FindBookingByIdResponseRto } from './rto/find-booking-by-id-response.rto';
import { FindMyBookingResponseRto } from './rto/find-my-booking-response.rto';
import { CurrentUser } from 'src/common/decorators/user-id.decorator';
import { IValidatedUser } from 'src/third-party/jwt/jwt.payload';
import { JwtAuthGuard } from 'src/third-party/jwt/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/third-party/guards/roles.guard';
import { UserRole } from 'src/database/user/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bookings')
export class BookingsController {

    constructor(private readonly bookingsService: BookingsService) { }

    @Post()
    @Roles(UserRole.USER, UserRole.ADMIN)
    async createBooking(@Body() data: CreateBookingDto): Promise<CreateBookingResponseRto> {
        return this.bookingsService.createBooking(data);
    }

    @Get()
    @Roles(UserRole.ADMIN)
    async findAllBookings(): Promise<FindAllBookingsResponseRto[]> {
        return this.bookingsService.findAllBookings();
    }

    @Get(":id")
    @Roles(UserRole.USER, UserRole.ADMIN)
    async findBookingById(@Param("id") id: number): Promise<FindBookingByIdResponseRto> {
        return this.bookingsService.findBookingById(id);
    }

    @Get("/my-bookings/:userId")
    @Roles(UserRole.USER, UserRole.ADMIN)
    async findMyBookings(@Param("userId") userId: number): Promise<FindMyBookingResponseRto[]> {
        return this.bookingsService.findMyBookings(userId);
    }

    @Delete("/my-bookings/:id")
    @Roles(UserRole.USER, UserRole.ADMIN)
    async cancelMyBooking(
        @Param('id') id: number,
        @CurrentUser() user: IValidatedUser,
    ): Promise<void> {
        await this.bookingsService.deleteBookingById(id, user.id);
    }

    @Delete(":id")
    @Roles(UserRole.ADMIN)
    async deleteBookingById(@Param('id') id: number): Promise<void> {
        await this.bookingsService.deleteBookingByIdAdmin(id);
    }
}
