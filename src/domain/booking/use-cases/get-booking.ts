import { BookingRepository } from "../repositories/booking-repository";

type Request = {
  id: string;
};

export class GetBookingUseCase {
  constructor(private bookingRepository: BookingRepository) {}

  async handle({ id }: Request) {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) return null;

    return booking;
  }
}
