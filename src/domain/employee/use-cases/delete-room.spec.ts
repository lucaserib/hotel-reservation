import Identity from "../../../core/entities/indentity";
import { InMemoryBookingRepository } from "../../../test/repositories/in-memory-booking-repository";
import { InMemoryRoomRepository } from "../../../test/repositories/in-memory-room-repository";
import Room from "../entitites/room";
import Email from "../../shared/value-objects/email";
import Money from "../../shared/value-objects/money";
import { DeleteRoomUsecase } from "./delete-room";
import Booking from "../../booking/entities/booking";

let bookingRepository: InMemoryBookingRepository;
let roomRepository: InMemoryRoomRepository;
let useCase: DeleteRoomUsecase;
describe("Delete room", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    bookingRepository = new InMemoryBookingRepository();
    useCase = new DeleteRoomUsecase(roomRepository, bookingRepository);

    const room = Room.create(
      {
        name: "Presidential Suite",
        price: Money.create(125000),
        image: "room.png",
      },
      new Identity("1")
    );
    roomRepository.items.push(room);

    const roomBooked = Room.create(
      {
        name: "Presidential Suite",
        price: Money.create(125000),
        image: "room.png",
        isAvaliable: false,
      },
      new Identity("2")
    );
    roomRepository.items.push(roomBooked);

    const booking = Booking.create(
      {
        customer: "Lucas",
        days: 3,
        email: Email.create("Lucas@gmail.com"),
        room: roomBooked,
        isActive: false,
      },
      new Identity("1")
    );
    bookingRepository.items.push(booking);
  });
  test("Should delete a room", async () => {
    expect(roomRepository.items).toHaveLength(2);

    await useCase.handle({
      id: "1",
    });

    expect(roomRepository.items).toHaveLength(1);
  });

  test("Should not delete a room that already have reservations", async () => {
    const response = await useCase.handle({
      id: "2",
    });

    expect(response).toEqual(null);
  });

  test("Should not delete a room with an invalid id", async () => {
    const response = await useCase.handle({
      id: "10",
    });

    expect(response).toEqual(null);
  });
});
