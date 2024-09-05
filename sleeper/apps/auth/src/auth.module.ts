import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { LoggerModule } from '@app/common';

@Module({
    imports: [UserModule, LoggerModule],
    controllers: [AuthController],
    providers: [AuthService, UserService],
})
export class AuthModule {}
