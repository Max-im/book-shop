import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthRepository } from './auth.repository';
import { ITokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
    constructor(
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

    login(user: User) {
        const payload: ITokenDto = {
            id: user.id,
            email: user.email,
        };

        const token = this.jwtService.sign(payload);
        return token;
    }
}
