import { pbkdf2Sync } from 'crypto';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthRepository } from './auth.repository';

const hashPassword = (password, salt) => {
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512');
    return hash.toString('hex');
};

const compare = (plainPassword, storedHash, salt) => {
    const hash = hashPassword(plainPassword, salt);
    return hash === storedHash;
};

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly repository: AuthRepository,
    ) {}

    async register(createUserDto: CreateUserDto) {
        const existingUser = await this.repository.getByEmail(createUserDto.email);
        if (existingUser) {
            throw new HttpException('Username is taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const user = new User();
        Object.assign(user, createUserDto);
        try {
            await this.repository.create(user);
            delete user.password;
            delete user.salt;
            return user;
        } catch (err) {
            throw new UnauthorizedException(err.message);
        }
    }

    async validateUser(email: string, password: string) {
        const errorMessage = 'Email or password are incorrect';
        const user = await this.repository.getByEmail(email);

        if (!user) {
            throw new UnauthorizedException(errorMessage);
        }

        const isCorrectPassword = await compare(password, user.password, user.salt);
        if (!isCorrectPassword) {
            throw new UnauthorizedException(errorMessage);
        }

        delete user.password;
        delete user.salt;
        return user;
    }

    login(user: User) {
        const payload = {
            id: user.id,
        };
        const expires = new Date();
        expires.setSeconds(expires.getSeconds() + this.configService.get('JWT_EXPERATION'));

        const token = this.jwtService.sign(payload);
        return { token };
        // response.cookie('Authentication', token, { httpOnly: true, expires });
    }

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
