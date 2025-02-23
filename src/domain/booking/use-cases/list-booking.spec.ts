import { InMemoryBookingRepository } from "../../../test/repositories/in-memory-booking-repository";
import { InMemoryRoomRepository } from "../../../test/repositories/in-memory-room-repository";
import Room from "../../employee/entitites/room";
import { ListRoomsUseCase } from "../../employee/use-cases/list-room";
import Email from "../../shared/value-objects/email";
import Money from "../../shared/value-objects/money";
import Booking from "../entities/booking";
import { ListBookingUseCase } from "./list-booking";

let bookingRepository: InMemoryBookingRepository;
let roomRepository: InMemoryRoomRepository;
let useCase: ListBookingUseCase;
describe("Booking List", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    bookingRepository = new InMemoryBookingRepository();
    useCase = new ListBookingUseCase(bookingRepository);
  });
  test("should list an array of rooms", async () => {
    const room = Room.create({
      name: "Presidential Suite",
      price: Money.create(120000),
      image: "room.png",
    });

    roomRepository.items.push(room);

    const booking = Booking.create({
      room,
      days: 2,
      customer: "Lucas",
      email: Email.create("Lucas@gmail.com"),
    });

    bookingRepository.items.push(booking);

    const response = await useCase.handle();

    expect(response).toHaveLength(1);
    expect(response).toBeInstanceOf(Array);
  });

  test("Should return an empty array", async () => {
    const response = await useCase.handle();

    expect(response).toHaveLength(0);
  });
});
