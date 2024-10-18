import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
    const app = await NestFactory.create(PaymentsModule);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useLogger(app.get(Logger));
    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [configService.getOrThrow('RABBITMQ_URL')],
            query: 'payments',
        },
    });
    await app.startAllMicroservices();
}
bootstrap();
