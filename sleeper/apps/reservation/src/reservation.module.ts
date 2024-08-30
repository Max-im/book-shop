import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DatabaseModule } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ReservationRepository } from './reservation.repository';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    DatabaseModule, 
    TypeOrmModule.forFeature([Reservation]), 
    LoggerModule.forRoot({
      name: 'reservation',
      pinoHttp: {
        transport: {
          target: 'pino-pretty'
        }
      }
    }),
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationModule {}
