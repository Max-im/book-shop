import { v4 as uuid } from 'uuid';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IsString, IsEmail } from 'class-validator';
import { Reservation } from '.';

const generateSalt = (length = 10) => {
    return randomBytes(length).toString('hex');
};

const hashPassword = (password, salt) => {
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512');
    return hash.toString('hex');
};

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

    @Column()
    @IsString()
    salt: string;

    @BeforeInsert()
    hashPassword() {
        const salt = generateSalt();
        this.salt = salt;
        this.password = hashPassword(this.password, salt);
    }

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[];

    @Column()
    roles?: string[];
}
