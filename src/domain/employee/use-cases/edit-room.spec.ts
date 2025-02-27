import Identity from "../../../core/entities/indentity";
import { InMemoryRoomRepository } from "../../../test/repositories/in-memory-room-repository";
import Money from "../../shared/value-objects/money";
import Room from "../entitites/room";
import { EditRoomRepository } from "./edit-room";

let roomRepository: InMemoryRoomRepository;
let useCase: EditRoomRepository;
describe("Room Edit", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    useCase = new EditRoomRepository(roomRepository);
  });
  test("Should edit a room", async () => {
    const room = Room.create({
      name: "Presidential Suite",
      price: Money.create(120000),
      image: "room.png",
    });

    roomRepository.items.push(room);

    const response = await useCase.handle({
      id: room.id.toString(),
      name: "Suite",
      price: 200000,
      image: room.image,
      hasAir: room.hasAir,
      hasWifi: room.hasWifi,
      hasKitchen: room.hasKitchen,
      isPetFriendly: room.isPetFriendly,
      isAvaliable: room.isAvaliable,
    });

    expect(response.isRight()).toBe(true);
    expect(roomRepository.items[0].name).toEqual("Suite");
    expect(roomRepository.items[0].price.value).toEqual(200000);
  });

  test("Should not edit a room with invalid id", async () => {
    const response = await useCase.handle({
      id: "1",
      name: "Suite",
      price: 200000,
      image: "room",
      hasAir: true,
      hasWifi: true,
      hasKitchen: true,
      isPetFriendly: true,
      isAvaliable: true,
    });

    expect(response.isLeft()).toBe(true);
  });
});
