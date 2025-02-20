import Identity from "../../../core/entities/indentity";
import { RoomRepository } from "../repositories/room-repository";

type Response = {
  id: string;
};

export class GetRoomUseCase {
  constructor(private roomRepository: RoomRepository) {}

  async handle({ id }: Response) {
    const rooms = await this.roomRepository.findById(id);

    return rooms;
  }
}
