import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { IUserDto } from '..';
import { Reflector } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

@Injectable()
export class JwtCommonAuthGuard implements CanActivate {
    private readonly logger = new Logger(JwtCommonAuthGuard.name);
    constructor(
        @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
        private readonly reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const jwt = request.cookies?.Authorization || request.headers?.authorization;
        if (!jwt) {
            return false;
        }
        const payload = { Authorization: jwt };
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        return this.authClient.send<IUserDto>('authenticate', payload).pipe(
            tap((res) => {
                for(const role of roles) {
                    if(!res.roles?.includes(role)) {
                        this.logger.error(`User ${res.email} does not have permission to access this resource`);
                        throw new UnauthorizedException('You do not have permission to access this resource');
                    }
                }
                request.user = res;
            }),
            map(() => true),
            catchError((err) => {
                this.logger.error(err);
                return of(false);
            }),
        );
    }
}
