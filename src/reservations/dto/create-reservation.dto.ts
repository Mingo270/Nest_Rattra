import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateReservationDto {
    @IsNotEmpty()
    @IsNumber()
    clientId: number;

    @IsNotEmpty()
    @IsNumber()
    restaurantId: number;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    seats: number;
}
