import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { Reservation } from 'apps/reservation/src/entities/reservation.entity';

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([User, Reservation]),
        LoggerModule,
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository],
})
export class UserModule {}
