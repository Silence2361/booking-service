import { Room } from "../room/room.entity";
import { User } from "../user/user.entity";

export interface IBooking {
    id: number;
    user: User;
    room: Room;
    startTime: Date;
    endTime: Date;
}

export interface ICreateBooking {
    userId: number;
    roomId: number;
    startTime: Date;
    endTime: Date;
}

export interface ICreateBookingResponse {
    id: number;
}

export interface IOverlapping {
    roomId: number;
    startTime: Date;
    endTime: Date;
}

export interface IFindAllBookingsResponse {
    id: number;
    userId: number;
    roomId: number;
    startTime: Date;
    endTime: Date;
}

export interface IFindBookingByIdResponse {
    id: number;
    userId: number;
    roomId: number;
    startTime: Date;
    endTime: Date;
}

export interface IFindBookingByUserIdResponse {
    id: number;
    userId: number;
    roomId: number;
    startTime: Date;
    endTime: Date;
}