import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Reservation } from '@app/common';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [User, Reservation],
                    synchronize: true,
                    retryAttempts: 10,
                    retryDelay: 2500,
                    autoLoadEntities: true,
                };
            },
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
