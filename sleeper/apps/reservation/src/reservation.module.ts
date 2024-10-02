import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule, LoggerModule, User, Reservation } from '@app/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, PAYMENT_SERVICE } from '@app/common/constants/services';

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([Reservation, User]),
        LoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                AUTH_HOST: Joi.string().required(),
                AUTH_PORT: Joi.number().required(),
                PAYMENT_HOST: Joi.string().required(),
                PAYMENT_PORT: Joi.number().required(),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.string().required(),
                DB_USER: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
            }),
        }),
        ClientsModule.registerAsync([
            {
                name: AUTH_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: { host: configService.get('AUTH_HOST'), port: configService.get('AUTH_PORT') },
                }),
                inject: [ConfigService],
            },
            {
                name: PAYMENT_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: { host: configService.get('PAYMENT_HOST'), port: configService.get('PAYMENT_PORT') },
                }),
                inject: [ConfigService],
            },
        ]),
    ],
    controllers: [ReservationController],
    providers: [ReservationService, ReservationRepository],
})
export class ReservationModule {}
