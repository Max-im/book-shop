import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { IUserDto } from '@app/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: any) => request?.cookies?.Authorization || request?.Authorization || request.headers?.authorization,
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET_OR_KEY'),
        });
    }

    async validate(payload: IUserDto) {
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
