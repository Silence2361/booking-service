import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateRoomDto {
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    roomNumber: number;

    @IsNumber()
    @Min(1)
    @Max(500)
    @IsNotEmpty()
    capacity: number;

    @IsString()
    @IsNotEmpty()
    location: string;
}