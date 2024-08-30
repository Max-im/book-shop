export class CreateReservationDto {
    readonly startDate: Date;
    readonly endDate: Date;
    readonly placeId: string;
    readonly invoiceId: string;
}
