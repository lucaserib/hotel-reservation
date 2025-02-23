import Identity from "../../../core/entities/indentity";
import { InMemoryBookingRepository } from "../../../test/repositories/in-memory-booking-repository";
import { InMemoryRoomRepository } from "../../../test/repositories/in-memory-room-repository";
import Room from "../../employee/entitites/room";
import Email from "../../shared/value-objects/email";
import Money from "../../shared/value-objects/money";
import Booking from "../entities/booking";
import { CancelBookingUseCase } from "./cancel-booking";

let bookingRepository: InMemoryBookingRepository;
let roomRepository: InMemoryRoomRepository;
let useCase: CancelBookingUseCase;
describe("Cancel booking", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    bookingRepository = new InMemoryBookingRepository();
    useCase = new CancelBookingUseCase(bookingRepository, roomRepository);
  });
  test("Should cancel a booking", async () => {
    const room = Room.create({
      name: "Presidential Suite",
      price: Money.create(125000),
      image: "room.png",
    });

    roomRepository.items.push(room);

    const booking = Booking.create(
      {
        customer: "Lucas",
        days: 3,
        email: Email.create("Lucas@gmail.com"),
        room,
        isActive: false,
      },
      new Identity("1")
    );

    bookingRepository.items.push(booking);

    await useCase.handle({
      bookingId: "1",
    });

    expect(bookingRepository.items[0].isActive).toBe(false);
    expect(roomRepository.items[0].isAvaliable).toBe(true);
  });

  test("should not cancel the booking with invalid id", async () => {
    const response = await useCase.handle({
      bookingId: "2",
    });

    expect(response).toEqual(null);
  });
});
