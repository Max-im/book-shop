import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { IUserDto, JwtCommonAuthGuard } from '@app/common';
import { CurrentUser } from '@app/common';

@Controller('/reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @Post()
    @UseGuards(JwtCommonAuthGuard)
    create(@Body() createReservationDto: CreateReservationDto, @CurrentUser() user: IUserDto) {
        return this.reservationService.create(createReservationDto, user.id);
    }

    @Get()
    @UseGuards(JwtCommonAuthGuard)
    findAll() {
        return this.reservationService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtCommonAuthGuard)
    findOne(@Param('id') id: string) {
        return this.reservationService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(JwtCommonAuthGuard)
    update(
        @Param('id') id: string,
        @Body() updateReservationDto: UpdateReservationDto,
    ) {
        return this.reservationService.update(+id, updateReservationDto);
    }

    @Delete(':id')
    @UseGuards(JwtCommonAuthGuard)
    remove(@Param('id') id: string) {
        return this.reservationService.remove(+id);
    }
}
