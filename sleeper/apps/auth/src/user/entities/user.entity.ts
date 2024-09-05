import { v4 as uuid } from 'uuid';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IsString, IsEmail } from 'class-validator';
import { Reservation } from 'apps/reservation/src/entities/reservation.entity';

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

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations: Reservation[];
}
