import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';

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
