import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DatabaseModule } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ReservationRepository } from './reservation.repository';
import { LoggerModule } from '@app/common';
import { User } from 'apps/auth/src/user/entities/user.entity';

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([Reservation, User]),
        LoggerModule,
    ],
    controllers: [ReservationController],
    providers: [ReservationService, ReservationRepository],
})
export class ReservationModule {}
