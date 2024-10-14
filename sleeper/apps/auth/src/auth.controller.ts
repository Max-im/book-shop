import { Body, Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @Post()
    async onRegister(@Body() createUserDto: CreateUserDto) {
        return await this.authService.register(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async onLogin(@Request() req, @Res() res: Response) {
        const token = this.authService.login(req.user);
        const expires = new Date();
        expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_EXPERATION'));
        res.cookie('Authorization', token, {
            httpOnly: true,
            expires,
        });

        return res.json({ token });
    }

    @UseGuards(JwtAuthGuard)
    @MessagePattern('authenticate')
    async authenticate(@Payload() data: any) {
        return data.user;
    }
}
