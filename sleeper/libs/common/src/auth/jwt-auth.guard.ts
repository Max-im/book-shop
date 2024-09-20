import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { IUserDto } from '..';

@Injectable()
export class JwtCommonAuthGuard implements CanActivate {
    constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const jwt = request.cookies?.Authorization;
        if (!jwt) {
            return false;
        }
        const payload = { Authorization: jwt };

        return this.authClient.send<IUserDto>('authenticate', payload).pipe(
            tap((res) => {
                request.user = res;
            }),
            map(() => true),
        );
    }
}
