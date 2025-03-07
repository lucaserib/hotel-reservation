import { InMemoryRoomRepository } from "../../../test/repositories/in-memory-room-repository";
import Money from "../../shared/value-objects/money";
import Room from "../entitites/room";
import { ListRoomsUseCase } from "./list-rooms";

let roomRepository: InMemoryRoomRepository;
let useCase: ListRoomsUseCase;
describe("Room List", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    useCase = new ListRoomsUseCase(roomRepository);
  });
  test("should list an array of rooms", async () => {
    const room = Room.create({
      name: "Presidential Suite",
      price: Money.create(120000),
      image: "room.png",
    });

    roomRepository.items.push(room);

    const response = await useCase.handle();

    expect(response.value).toHaveLength(1);
    expect(response.isRight()).toBe(true);
  });
  test("should list an empty array", async () => {
    const response = await useCase.handle();

    expect(response.value).toHaveLength(0);
    expect(response.isRight()).toBe(true);
  });
});
