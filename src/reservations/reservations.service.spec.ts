import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Restaurant } from './entities/restaurant.entity';
import { Client } from './entities/client.entity';

describe('ReservationsService', () => {
    let service: ReservationsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReservationsService,
                {
                    provide: getRepositoryToken(Reservation),
                    useValue: {},
                },
                {
                    provide: getRepositoryToken(Restaurant),
                    useValue: {},
                },
                {
                    provide: getRepositoryToken(Client),
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<ReservationsService>(ReservationsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // Ajoutez des tests supplémentaires ici pour chaque méthode du service
});
