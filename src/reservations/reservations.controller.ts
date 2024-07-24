import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    @Post()
    create(@Body() createReservationDto: CreateReservationDto) {
        return this.reservationsService.create(createReservationDto);
    }

    @Delete(':id')
    cancel(@Param('id') id: string) {
        return this.reservationsService.cancel(+id);
    }

    @Get('client/:clientId')
    findAllByClient(@Param('clientId') clientId: string) {
        return this.reservationsService.findAllByClient(+clientId);
    }

    @Get('restaurant/:restaurantId')
    findAllByRestaurant(@Param('restaurantId') restaurantId: string) {
        return this.reservationsService.findAllByRestaurant(+restaurantId);
    }

    @Get('available/:restaurantId/:date')
    getAvailableSeats(@Param('restaurantId') restaurantId: string, @Param('date') date: string) {
        return this.reservationsService.getAvailableSeats(+restaurantId, new Date(date));
    }
}
