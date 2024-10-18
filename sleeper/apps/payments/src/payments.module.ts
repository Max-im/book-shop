import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { LoggerModule, NOTIFICATION_SERVICE } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        LoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                STRIPE_SECRET_KEY: Joi.string().required(),
                NOTIFICATION_PORT: Joi.number().required(),
                NOTIFICATION_HOST: Joi.string().required(),
                RABBITMQ_URL: Joi.string().required(),
            }),
        }),
        ClientsModule.registerAsync([
            {
                name: NOTIFICATION_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [configService.getOrThrow<string>('RABBITMQ_URL')],
                        query: 'payments',
                    },
                }),
                inject: [ConfigService],
            },
        ]),
    ],
    controllers: [PaymentsController],
    providers: [PaymentsService],
})
export class PaymentsModule {}
