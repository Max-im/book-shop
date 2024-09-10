import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
// import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        // private readonly jwtService: JwtService,
    ) { }

    async register(createUserDto: CreateUserDto) {
        // const existingUser = await this.repository.getByEmail(createUserDto.email);
        // if (existingUser) {
        //     throw new HttpException('Username is taken', HttpStatus.UNPROCESSABLE_ENTITY);
        // }

        // const user = new User();
        // Object.assign(user, createUserDto);
        // await this.repository.create(user);
        // return user;
    }

    async validateUser(email: string, password: string) {
        // const errorMessage = 'Email or password are incorrect';
        // const user = await this.repository.getByEmail(email);

        // if (!user) {
        //     throw new UnauthorizedException(errorMessage);
        // }

        // const isCorrectPassword = await compare(password, user.password);
        // if (!isCorrectPassword) {
        //     throw new UnauthorizedException(errorMessage);
        // }

        // delete user.password;
        // return user;
    }

    // login(user: User, response: Response) {
    //     const payload = {
    //         id: user.id,
    //     };
    //     const expires = new Date();
    //     expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_EXPERATION'));

    //     const token = this.jwtService.sign(payload);

    //     response.cookie('Authentication', token, { httpOnly: true, expires });
    // }

    // buildResponse(user: User) {
    //     const payload = {
    //         id: user.id,
    //     };
    //     const expires = new Date();
    //     expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_EXPERATION'));

    //     const token = this.jwtService.sign(payload);

    //     // response.cookie('Authentication', token, { httpOnly: true, expires });
    // }
}
