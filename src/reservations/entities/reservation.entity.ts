import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from './client.entity';
import { Restaurant } from './restaurant.entity';
import { CustomLogger} from "../../winston-logger";

CustomLogger.info('This is an info message');
CustomLogger.error('This is an error message');


@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    numberOfPeople: number;

    @ManyToOne(() => Restaurant, restaurant => restaurant.reservations)
    restaurant: Restaurant;

    @ManyToOne(() => Client, client => client.reservations)
    client: Client;
}
