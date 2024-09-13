import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ITokenDto } from '../dto/token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request?.cookies?.Authorization]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET_OR_KEY'),
        });
    }

    async validate(payload: ITokenDto) {
        try {
            return {
                id: payload.id,
                email: payload.email,
            };
        } catch (err) {
            throw new UnauthorizedException(err);
        }
    }
}
