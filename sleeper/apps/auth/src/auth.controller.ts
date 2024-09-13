import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

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

        return res.json({ success: true });
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    onGetUserData(@Request() req) {
        return req.user;
    }
}
