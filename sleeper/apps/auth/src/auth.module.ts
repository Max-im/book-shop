import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule, LoggerModule, User, Reservation, HealthModule } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([User, Reservation]),
        LoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                TCP_PORT: Joi.number().required(),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.string().required(),
                DB_USER: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                JWT_SECRET_OR_KEY: Joi.string().required(),
                JWT_EXPERATION: Joi.string().required(),
            }),
        }),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET_OR_KEY'),
                signOptions: {
                    expiresIn: `${configService.get<string>('JWT_EXPERATION')}s`,
                },
            }),
            inject: [ConfigService],
        }),
        HealthModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
