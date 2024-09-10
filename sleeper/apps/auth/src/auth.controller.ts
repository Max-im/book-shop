import { Body, Controller, Post } from '@nestjs/common';
// import { Response } from 'express';
import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './guards/local-auth.guard';
// import { CurrentUser } from './current-user.decorator';
// import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async onRegister(@Body() createUserDto: CreateUserDto) {
        const user = await this.authService.register(createUserDto);
        return user;
        // return this.authService.buildResponse(user);
    }

    // @UseGuards(LocalAuthGuard)
    // @Post('login')
    // async onLogin(
    //     @CurrentUser() user: User,
    //     @Res({ pasthrough: true }) response: Response,
    // ) {
    //     this.authService.login(user, response);
    //     response.send(user);
    // }
}
