import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@app/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
    imports: [
        LoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                STRIPE_SECRET_KEY: Joi.string().required(),
                SMTP_USER: Joi.string().required(),
                OAUTH_CLIENT_ID: Joi.string().required(),
                OAUTH_CLIENT_SECRET: Joi.string().required(),
                OAUTH_REFRESH_TOKEN: Joi.string().required(),
            }),
        }),
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule {}
