import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { Restaurant } from './entities/restaurant.entity';
import { Client } from './entities/client.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation)
        private reservationsRepository: Repository<Reservation>,
        @InjectRepository(Restaurant)
        private restaurantsRepository: Repository<Restaurant>,
        @InjectRepository(Client)
        private clientsRepository: Repository<Client>,
    ) {}

    async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
        const restaurant = await this.restaurantsRepository.findOne({ where: { id: createReservationDto.restaurantId } });
        const client = await this.clientsRepository.findOne({ where: { id: createReservationDto.clientId } });

        if (!restaurant || !client) {
            throw new Error('Invalid restaurant or client ID');
        }

        const availableSeats = await this.getAvailableSeats(restaurant.id, createReservationDto.date);
        if (availableSeats < createReservationDto.numberOfPeople) {
            throw new Error('Not enough available seats');
        }

        const reservation = new Reservation();
        reservation.date = createReservationDto.date;
        reservation.numberOfPeople = createReservationDto.numberOfPeople;
        reservation.restaurant = restaurant;
        reservation.client = client;

        return this.reservationsRepository.save(reservation);
    }

    async cancel(id: number): Promise<void> {
        const reservation = await this.reservationsRepository.findOne({ where: { id } });
        if (!reservation) {
            throw new Error('Reservation not found');
        }

        const currentDate = new Date();
        if (reservation.date < currentDate) {
            throw new Error('Cannot cancel past reservations');
        }

        await this.reservationsRepository.delete(id);
    }

    async findAllByClient(clientId: number): Promise<Reservation[]> {
        console.log('Finding reservations for client ID:', clientId);

        return this.reservationsRepository.find({
            where: { id: clientId },
            relations: ['restaurant'],
        }).then(reservations => {
            console.log('Found reservations:', reservations);
            return reservations;
        });
    }

    async findAllByRestaurant(restaurantId: number): Promise<Reservation[]> {
        console.log('Finding reservations for restaurant ID:', restaurantId);

        const reservations = await this.reservationsRepository.find({
            where: { id: restaurantId },
            relations: ['client'],
        });
        console.log('Found reservations:', reservations);

        return reservations;
    }


    async getAvailableSeats(restaurantId: number, date: Date): Promise<number> {
        const restaurant = await this.restaurantsRepository.findOne({
            where: { id: restaurantId },
            relations: ['reservations'],
        });
        if (!restaurant) {
            throw new Error('Restaurant not found');
        }
        const reservations = restaurant.reservations.filter(
            (reservation) => reservation.date.toDateString() === date.toDateString(),
        );
        const reservedSeats = reservations.reduce(
            (sum, reservation) => sum + reservation.numberOfPeople,
            0,
        );
        return restaurant.totalSeats - reservedSeats;
    }
}
