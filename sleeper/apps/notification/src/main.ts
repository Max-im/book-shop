import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(NotificationModule);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useLogger(app.get(Logger));
    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [configService.getOrThrow('RABBITMQ_URL')],
            query: 'notification',
        },
    });
    await app.startAllMicroservices();
}
bootstrap();
