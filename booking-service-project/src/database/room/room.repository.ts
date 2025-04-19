import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { ICreateRoom, ICreateRoomResponse, IRoom, IUpdateRoomById } from './room.interface';

@Injectable()
export class RoomRepository {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ) { }

    async createRoom(data: ICreateRoom): Promise<ICreateRoomResponse> {
        const room = this.roomRepository.create(data);
        return this.roomRepository.save(room);
    }

    async findAllRoomsByStatus(isActive: boolean): Promise<IRoom[]> {
        return this.roomRepository.find({ where: { isActive } });
    }

    async findByRoomNumber(roomNumber: number): Promise<IRoom | null> {
        return this.roomRepository.findOne({ where: { roomNumber } });
    }

    async findRoomById(id: number): Promise<IRoom | null> {
        return this.roomRepository.findOne({ where: { id } });
    }

    async updateRoomById(id: number, data: IUpdateRoomById): Promise<void> {
        await this.roomRepository.update(id, data);
    }

    async activateRoomById(id: number): Promise<void> {
        await this.roomRepository.update(id, { isActive: true });
    }

    async deactivateRoomById(id: number): Promise<void> {
        await this.roomRepository.update(id, { isActive: false });
    }

    async deleteRoomById(id: number): Promise<void> {
        await this.roomRepository.delete(id);
    }
}
