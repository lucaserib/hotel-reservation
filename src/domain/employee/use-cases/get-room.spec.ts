import { InMemoryRoomRepository } from "../../../test/repositories/in-memory-room-repository";
import Money from "../../shared/value-objects/money";
import Room from "../entitites/room";
import { GetRoomUseCase } from "./get-room";

let roomRepository: InMemoryRoomRepository;
let useCase: GetRoomUseCase;
describe("Room details", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    useCase = new GetRoomUseCase(roomRepository);
  });
  test("should return the room by the ID", async () => {
    const room = Room.create({
      name: "Presidential Suite",
      price: Money.create(125000),
      image: "room.png",
    });

    roomRepository.items.push(room);

    const response = await useCase.handle({
      id: room.id.toString(),
    });

    expect(response.isRight()).toBe(true);
  });

  test("should not return a room whit invalid id", async () => {
    const response = await useCase.handle({
      id: "1",
    });

    expect(response.isLeft()).toBe(true);
    //expect(response.value).toBeInstanceOf(Error)
  });
});
