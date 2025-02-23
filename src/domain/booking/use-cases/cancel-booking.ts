import { RoomRepository } from "../../employee/repositories/room-repository";
import { BookingRepository } from "../repositories/booking-repository";

type Response = {
  bookingId: string;
};

export class CancelBookingUseCase {
  constructor(
    private bookingRepository: BookingRepository,
    private roomRepository: RoomRepository
  ) {}

  async handle({ bookingId }: Response) {
    const bookingExists = await this.bookingRepository.findById(bookingId);

    if (!bookingExists) return null;

    bookingExists.isActive = false;

    await this.bookingRepository.cancel(bookingExists);

    const { room } = bookingExists;

    room.isAvaliable = true;

    await this.roomRepository.save(room);

    return bookingExists;
  }
}
