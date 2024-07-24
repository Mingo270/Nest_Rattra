import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReservationsModule } from './reservations/reservations.module';
import { Restaurant } from './reservations/entities/restaurant.entity';
import { Client } from './reservations/entities/client.entity';
import { Reservation } from './reservations/entities/reservation.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DATABASE_HOST'),
                port: configService.get<number>('DATABASE_PORT'),
                username: configService.get<string>('DATABASE_USER'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                entities: [Restaurant, Client, Reservation],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        ReservationsModule,
    ],
})
export class AppModule {}
