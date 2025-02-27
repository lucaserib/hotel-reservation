import Identity from "../../../core/entities/indentity";
import { InMemoryRoomRepository } from "../../../test/repositories/in-memory-room-repository";
import { CreateRoomUseCase } from "./create-room";

let roomRepository: InMemoryRoomRepository;
let useCase: CreateRoomUseCase;
describe("Room Creation", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    useCase = new CreateRoomUseCase(roomRepository);
  });
  test("should create a room", async () => {
    const room = await useCase.handle({
      name: "Presidential Suite",
      price: 120000,
      image: "room.png",
    });

    expect(room.isRight()).toBe(true);
    expect(roomRepository.items[0].id).toBeInstanceOf(Identity);
    expect(roomRepository.items[0].id.toString()).toEqual(
      room.value?.id.toString()
    );
    expect(roomRepository.items[0].price.formattedPriceBRL()).toEqual(
      "R$\u{a0}1.200,00"
    );
    expect(roomRepository.items[0].name).toEqual("Presidential Suite");
    expect(roomRepository.items[0].image).toEqual("room.png");
    expect(roomRepository.items[0].hasWifi).toBe(false);
    expect(roomRepository.items[0].hasAir).toBe(false);
    expect(roomRepository.items[0].hasKitchen).toBe(false);
    expect(roomRepository.items[0].isPetFriendly).toBe(false);
    expect(roomRepository.items[0].isAvaliable).toBe(true);
  });
});
