import { Either, right } from "../../../core/errors/either/either";
import Booking from "../entities/booking";
import { BookingRepository } from "../repositories/booking-repository";

type Response = Either<null, Booking[]>;

export class ListBookingUseCase {
  constructor(private bookingRepository: BookingRepository) {}
  async handle(): Promise<Response> {
    const bookings = await this.bookingRepository.findMany();

    return right(bookings);
  }
}
