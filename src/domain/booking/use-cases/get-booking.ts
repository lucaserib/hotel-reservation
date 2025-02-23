import { BookingRepository } from "../repositories/booking-repository";

type Response = {
  id: string;
};

export class GetBookingUseCase {
  constructor(private bookingRepository: BookingRepository) {}

  async handle({ id }: Response) {
    const booking = await this.bookingRepository.findById(id);

    if (!booking) return null;

    return booking;
  }
}
