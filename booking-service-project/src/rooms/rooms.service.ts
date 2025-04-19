import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ICreateRoom, ICreateRoomResponse, IFindAllRoomsResponse, IFindRoomByIdResponse, IFindRoomByNumberResponse, IRoom, IUpdateRoomById } from "src/database/room/room.interface";
import { RoomRepository } from "src/database/room/room.repository";


@Injectable()
export class RoomsService {
    constructor(private readonly roomRepository: RoomRepository) { }

    async createRoom(data: ICreateRoom): Promise<ICreateRoomResponse> {
        const { roomNumber, capacity, location } = data

        const existingRoom = await this.roomRepository.findByRoomNumber(roomNumber)

        if (existingRoom) {
            throw new ConflictException('Room with this room number already exists')
        }

        const room = await this.roomRepository.createRoom({ roomNumber, capacity, location })
        return { id: room.id }
    }


    async findAllByStatusQuery(activeQuery?: string): Promise<IFindAllRoomsResponse[]> {
        let isActive: boolean;

        if (activeQuery === undefined) {
            isActive = true;
        } else if (activeQuery.toLowerCase() === 'true') {
            isActive = true;
        } else if (activeQuery.toLowerCase() === 'false') {
            isActive = false;
        } else {
            throw new BadRequestException('Invalid "active" query param. Use true or false.');
        }

        return this.roomRepository.findAllRoomsByStatus(isActive);
    }




    async findRoomById(id: number): Promise<IFindRoomByIdResponse> {
        const room = await this.roomRepository.findRoomById(id);
        if (!room) {
            throw new NotFoundException(`Room with id ${id} not found`);
        }
        return room;
    }

    async findByRoomNumber(roomNumber: number): Promise<IFindRoomByNumberResponse> {
        const room = await this.roomRepository.findByRoomNumber(roomNumber);
        if (!room) {
            throw new NotFoundException(`Room with room number ${roomNumber} not found`);
        }
        return room;
    }

    async updateRoomById(id: number, data: IUpdateRoomById): Promise<void> {
        const room = await this.roomRepository.findRoomById(id);

        if (!room) {
            throw new NotFoundException(`Room with id ${id} not found`);
        }

        if (data.roomNumber && data.roomNumber !== room.roomNumber) {
            const existingRoom = await this.roomRepository.findByRoomNumber(data.roomNumber);

            if (existingRoom && existingRoom.id !== id) {
                throw new ConflictException('Room with this number already exists');
            }
        }

        await this.roomRepository.updateRoomById(id, data);
    }

    async activateRoomById(id: number): Promise<void> {
        const room = await this.roomRepository.findRoomById(id);
        if (!room) {
            throw new NotFoundException(`Room with id ${id} not found`);
        }
        await this.roomRepository.activateRoomById(id);
    }

    async deactivateRoomById(id: number): Promise<void> {
        const room = await this.roomRepository.findRoomById(id);
        if (!room) {
            throw new NotFoundException(`Room with id ${id} not found`);
        }
        await this.roomRepository.deactivateRoomById(id);
    }

    async deleteRoomById(id: number): Promise<void> {
        const room = await this.roomRepository.findRoomById(id);
        if (!room) {
            throw new NotFoundException(`Room with id ${id} not found`);
        }
        await this.roomRepository.deleteRoomById(id);
    }
}