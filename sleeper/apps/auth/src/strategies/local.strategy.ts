import { pbkdf2Sync } from 'crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthRepository } from '../auth.repository';

const hashPassword = (password, salt) => {
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512');
    return hash.toString('hex');
};

const compare = (plainPassword, storedHash, salt) => {
    const hash = hashPassword(plainPassword, salt);
    return hash === storedHash;
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly repository: AuthRepository) {
        super({ usernameField: 'email' });
    }

    async validate(email, password) {
        try {
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
        } catch (err) {
            throw new UnauthorizedException(err);
        }
    }
}
