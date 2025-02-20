import Money from "../../shared/value-objects/money";
import { RoomRepository } from "../repositories/room-repository";

type Request = {
  id: string;
  name: string;
  price: number;
  image: string;
  hasWifi: boolean;
  hasAir: boolean;
  hasKitchen: boolean;
  isPetFriendly: boolean;
  isAvaliable: boolean;
};

export class EditRoomRepository {
  constructor(private roomRepository: RoomRepository) {}
  async handle(data: Request) {
    const room = await this.roomRepository.findById(data.id);

    if (!room) return null;

    const price = Money.create(data.price);

    room.name = data.name;
    room.price = price;
    room.image = data.image;
    room.hasWifi = data.hasWifi;
    room.hasAir = data.hasAir;
    room.hasKitchen = data.hasKitchen;
    room.isPetFriendly = data.isPetFriendly;
    room.isAvaliable = data.isAvaliable;

    await this.roomRepository.save(room);

    return room;
  }
}
