export interface IRoom {
    id: number;
    roomNumber: number;
    capacity: number;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export interface ICreateRoom {
    roomNumber: number;
    capacity: number;
    location: string;
}

export interface ICreateRoomResponse {
    id: number;
}

export interface IFindAllRoomsResponse {
    id: number;
    roomNumber: number;
    capacity: number;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export interface IFindRoomByIdResponse {
    id: number;
    roomNumber: number;
    capacity: number;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export interface IFindRoomByNumberResponse {
    id: number;
    roomNumber: number;
    capacity: number;
    location: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export interface IUpdateRoomById {
    roomNumber?: number;
    capacity?: number;
    location?: string;
}