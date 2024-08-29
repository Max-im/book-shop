import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
    imports: [NestConfigModule.forRoot({
        validationSchema: Joi.object({
            DB_HOST: Joi.string().required(),
            DB_PORT: Joi.string().required(),
            DB_USER: Joi.string().required(),
            DB_PASSWORD: Joi.string().required(),
            DB_NAME: Joi.string().required(),
        })
    })],
    providers: [ConfigService],
    exports: [ConfigService]
})

export class ConfigModule {}
