import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from './client.entity';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    seats: number;

    @ManyToOne(() => Client, client => client.reservations)
    client: Client;

    @ManyToOne(() => Restaurant, restaurant => restaurant.reservations)
    restaurant: Restaurant;
}
