import { InMemoryBookingRepository } from "../../../test/repositories/in-memory-booking-repository";
import { InMemoryRoomRepository } from "../../../test/repositories/in-memory-room-repository";
import Room from "../../employee/entitites/room";
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

    expect(response.value).toHaveLength(1);
    expect(response.value).toBeInstanceOf(Array);
    expect(response.isRight()).toBe(true);
  });

  test("Should return an empty array", async () => {
    const response = await useCase.handle();

    expect(response.value).toHaveLength(0);
    expect(response.isRight()).toBe(true);
  });
});
