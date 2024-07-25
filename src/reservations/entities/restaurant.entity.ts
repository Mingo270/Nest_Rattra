import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';
import { CustomLogger} from "../../winston-logger";

CustomLogger.info('This is an info message');
CustomLogger.error('This is an error message');

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    totalSeats: number;

    @OneToMany(() => Reservation, reservation => reservation.restaurant)
    reservations: Reservation[];
}
