import { NotAllowed } from "../../../core/errors/custom-errors/not-allowed";
import { NotFoundError } from "../../../core/errors/custom-errors/not-found-error";
import { Either, left, right } from "../../../core/errors/either/either";
import { BookingRepository } from "../../booking/repositories/booking-repository";
import { RoomRepository } from "../repositories/room-repository";

type Request = {
  id: string;
};

type Response = Either<NotFoundError | NotAllowed, boolean>;

export class DeleteRoomUsecase {
  constructor(
    private roomRepository: RoomRepository,
    private bookingRepository: BookingRepository
  ) {}
  async handle({ id }: Request): Promise<Response> {
    const room = await this.roomRepository.findById(id);

    if (!room) return left(new NotFoundError());

    const bookingExists = await this.bookingRepository.findByRoomId(
      room.id.toString()
    );

    if (bookingExists) return left(new NotAllowed());

    await this.roomRepository.delete(id);

    return right(true);
  }
}
