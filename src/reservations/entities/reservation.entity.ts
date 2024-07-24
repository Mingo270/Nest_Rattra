import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { Client } from './client.entity';

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
