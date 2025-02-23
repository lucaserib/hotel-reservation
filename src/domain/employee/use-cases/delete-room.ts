import { BookingRepository } from "../../booking/repositories/booking-repository";
import { RoomRepository } from "../repositories/room-repository";

type Request = {
  id: string;
};

export class DeleteRoomUsecase {
  constructor(
    private roomRepository: RoomRepository,
    private bookingRepository: BookingRepository
  ) {}
  async handle({ id }: Request) {
    const room = await this.roomRepository.findById(id);

    if (!room) return null;

    const bookingExists = await this.bookingRepository.findByRoomId(
      room.id.toString()
    );

    if (bookingExists) return null;
    await this.roomRepository.delete(id);

    return {};
  }
}
