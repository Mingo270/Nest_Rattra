import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';
import { CustomLogger} from "../../winston-logger";

CustomLogger.info('This is an info message');
CustomLogger.error('This is an error message');


@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Reservation, reservation => reservation.client)
    reservations: Reservation[];
}
