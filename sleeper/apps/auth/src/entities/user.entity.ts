import crypto from 'node:crypto';
import { v4 as uuid } from 'uuid';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IsString, IsEmail } from 'class-validator';
import { Reservation } from 'apps/reservation/src/entities/reservation.entity';

const generateSalt = (length = 10) => {
    return crypto.randomBytes(length).toString('hex');
};

const hashPassword = (password, salt) => {
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512');
    return hash.toString('hex');
};

// const comparePasswords = (plainPassword, storedHash, salt) => {
//     const hash = hashPassword(plainPassword, salt);
//     return hash === storedHash;
// };

@Entity({ name: 'users' })
export class User {
    @PrimaryColumn({ type: 'uuid', default: uuid() })
    id: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    password: string;

    @BeforeInsert()
    hashPassword() {
        const salt = generateSalt();
        this.password = hashPassword(this.password, salt);
    }

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[];
}
