import Money from "../../shared/value-objects/money";
import Room from "../entitites/room";
import { RoomRepository } from "../repositories/room-repository";

type Request = {
  name: string;
  price: number;
  image: string;
  hasWifi?: boolean;
  hasAir?: boolean;
  hasKitchen?: boolean;
  isPetFriendly?: boolean;
  isAvaliable?: boolean;
};

export class CreateRoomUseCase {
  constructor(private roomRepository: RoomRepository) {}
  async handle(data: Request) {
    const price = Money.create(data.price);

    const room = Room.create({ ...data, price });

    await this.roomRepository.create(room);
    return room;
  }
}
