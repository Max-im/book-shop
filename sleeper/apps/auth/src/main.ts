import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AuthModule);
    const configService = app.get(ConfigService);
    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [configService.getOrThrow('RABBITMQ_URL')],
            query: 'auth',
        },
    });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useLogger(app.get(Logger));
    app.use(cookieParser());
    await app.startAllMicroservices();
    await app.listen(configService.get('PORT'));
}
bootstrap();
