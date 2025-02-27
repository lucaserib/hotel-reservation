import { NotFoundError } from "../../../core/errors/custom-errors/not-found-error";
import { Either, left, right } from "../../../core/errors/either/either";
import Room from "../entitites/room";
import { RoomRepository } from "../repositories/room-repository";

type Request = {
  id: string;
};

type Response = Either<Error, Room>;

export class GetRoomUseCase {
  constructor(private roomRepository: RoomRepository) {}

  async handle({ id }: Request): Promise<Response> {
    const room = await this.roomRepository.findById(id);

    if (!room) return left(new NotFoundError());

    return right(room);
  }
}
