import { BookingRepository } from "../repositories/booking-repository";

export class ListBookingUseCase {
  constructor(private bookingRepository: BookingRepository) {}
  async handle() {
    const rooms = await this.bookingRepository.findMany();
    return rooms;
  }
}
