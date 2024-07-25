import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Restaurant } from './entities/restaurant.entity';
import { Client } from './entities/client.entity';
import { CustomLogger } from '../winston-logger';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectRepository(Reservation)
        private readonly reservationsRepository: Repository<Reservation>,
        @InjectRepository(Restaurant)
        private readonly restaurantsRepository: Repository<Restaurant>,
        @InjectRepository(Client)
        private readonly clientsRepository: Repository<Client>,
    ) {}

    async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
        const { clientId, restaurantId, date, seats } = createReservationDto;

        CustomLogger.info(`Creating reservation: clientId=${clientId}, restaurantId=${restaurantId}, date=${date}, seats=${seats}`);

        const client = await this.clientsRepository.findOne({ where: { id: clientId } });
        const restaurant = await this.restaurantsRepository.findOne({ where: { id: restaurantId } });

        if (!restaurant || !client) {
            CustomLogger.error(`Invalid restaurant or client ID: restaurantId=${restaurantId}, clientId=${clientId}`);
            throw new NotFoundException('Invalid restaurant or client ID');
        }

        const reservation = this.reservationsRepository.create({ client, restaurant, date, seats });
        await this.reservationsRepository.save(reservation);
        CustomLogger.info(`Reservation created successfully: ${JSON.stringify(reservation)}`);
        return reservation;
    }

    async cancel(id: number): Promise<void> {
        CustomLogger.info(`Cancelling reservation with ID: ${id}`);

        const result = await this.reservationsRepository.delete(id);
        if (result.affected === 0) {
            CustomLogger.error(`Reservation with ID ${id} not found for cancellation.`);
            throw new NotFoundException(`Reservation with ID ${id} not found.`);
        }

        CustomLogger.info(`Reservation with ID ${id} cancelled successfully.`);
    }

    async findAllByClient(clientId: number): Promise<Reservation[]> {
        CustomLogger.info(`Finding reservations for client ID: ${clientId}`);

        const reservations = await this.reservationsRepository.find({
            where: { id: clientId },
            relations: ['restaurant'],
        });

        if (reservations.length === 0) {
            CustomLogger.info(`No reservations found for client ID: ${clientId}`);
        } else {
            CustomLogger.info(`Found reservations for client ID ${clientId}: ${JSON.stringify(reservations)}`);
        }

        return reservations;
    }

    async findAllByRestaurant(restaurantId: number): Promise<Reservation[]> {
        CustomLogger.info(`Finding reservations for restaurant ID: ${restaurantId}`);

        const reservations = await this.reservationsRepository.find({
            where: { id: restaurantId },
            relations: ['client'],
        });

        if (reservations.length === 0) {
            CustomLogger.info(`No reservations found for restaurant ID: ${restaurantId}`);
        } else {
            CustomLogger.info(`Found reservations for restaurant ID ${restaurantId}: ${JSON.stringify(reservations)}`);
        }

        return reservations;
    }

    async getAvailableSeats(restaurantId: number, date: Date): Promise<number> {
        CustomLogger.info(`Calculating available seats for restaurant ID ${restaurantId} on date ${date}`);

        const restaurant = await this.restaurantsRepository.findOne({ where: { id: restaurantId } });
        if (!restaurant) {
            CustomLogger.error(`Restaurant with ID ${restaurantId} not found.`);
            throw new NotFoundException(`Restaurant with ID ${restaurantId} not found.`);
        }

        const reservations = await this.reservationsRepository.find({
            where: { id: restaurantId, date: date },
        });

        const totalSeatsReserved = reservations.reduce((total, reservation) => total + reservation.seats, 0);
        const availableSeats = restaurant.totalSeats - totalSeatsReserved;

        CustomLogger.info(`Available seats for restaurant ID ${restaurantId} on date ${date}: ${availableSeats}`);
        return availableSeats;
    }
}
