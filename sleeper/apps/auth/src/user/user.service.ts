import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly repository: UserRepository) {}

    async create(createUserDto: CreateUserDto) {
        const user = new User();
        Object.assign(user, createUserDto);
        await this.repository.create(user);
        return user;
    }
}
