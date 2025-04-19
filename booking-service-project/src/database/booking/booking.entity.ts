import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Room } from "../room/room.entity";

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { eager: true })
    user: User;

    @ManyToOne(() => Room, { eager: true })
    room: Room;

    @Column({ type: 'timestamp' })
    startTime: Date;

    @Column({ type: 'timestamp' })
    endTime: Date;

    @CreateDateColumn()
    createdAt: Date;
}
