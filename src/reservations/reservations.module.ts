import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './entities/reservation.entity';
import { Restaurant } from './entities/restaurant.entity';
import { Client } from './entities/client.entity';
import { CustomLogger} from "../winston-logger";

CustomLogger.info('This is an info message');
CustomLogger.error('This is an error message');


@Module({
    imports: [
        TypeOrmModule.forFeature([Reservation, Restaurant, Client]),
    ],
    controllers: [ReservationsController],
    providers: [ReservationsService],
})
export class ReservationsModule {}
