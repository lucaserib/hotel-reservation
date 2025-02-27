import { Either, right } from "../../../core/errors/either/either";
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

type Response = Either<null, Room>;

export class CreateRoomUseCase {
  constructor(private roomRepository: RoomRepository) {}
  async handle(data: Request): Promise<Response> {
    const price = Money.create(data.price);

    const room = Room.create({ ...data, price });

    await this.roomRepository.create(room);

    return right(room);
  }
}
