import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { IsFutureDate } from "src/common/decorators/is-future-date.validator";

export class CreateBookingDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNumber()
    @IsNotEmpty()
    roomId: number;

    @IsDateString()
    @IsNotEmpty()
    @IsFutureDate({ message: 'startTime must be in the future' })
    startTime: Date;

    @IsDateString()
    @IsNotEmpty()
    @IsFutureDate({ message: 'endTime must be in the future' })
    endTime: Date;
}
