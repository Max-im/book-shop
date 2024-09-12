import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ReservationModule } from './reservation.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(ReservationModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useLogger(app.get(Logger));
    const configService = app.get(ConfigService);
    console.log(configService.get('HOST'));
    await app.listen(configService.get('PORT'));
}
bootstrap();
