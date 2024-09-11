import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { CurrentUser } from './current-user.decorator';
// import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async onRegister(@Body() createUserDto: CreateUserDto) {
        return await this.authService.register(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async onLogin(@Request() req) {
        const user = this.authService.login(req.user);
        return user;
    }
}
