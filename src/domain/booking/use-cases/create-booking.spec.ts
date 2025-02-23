import Identity from "../../../core/entities/indentity";
import { InMemoryBookingRepository } from "../../../test/repositories/in-memory-booking-repository";
import { InMemoryRoomRepository } from "../../../test/repositories/in-memory-room-repository";
import Room from "../../employee/entitites/room";
import Money from "../../shared/value-objects/money";
import { BookingRepository } from "../repositories/booking-repository";
import { CreateBookingUseCase } from "./create-booking";

let roomRepository: InMemoryRoomRepository;
let bookingRepository: InMemoryBookingRepository;
let useCase: CreateBookingUseCase;
describe("Creating a Booking", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    bookingRepository = new InMemoryBookingRepository();

    useCase = new CreateBookingUseCase(roomRepository, bookingRepository);
    const room = Room.create(
      {
        name: "Presidential Suite",
        price: Money.create(12000),
        image: "room.png",
      },
      new Identity("2")
    );
    const roomBooked = Room.create(
      {
        name: "Presidential Suite 2",
        price: Money.create(250000),
        image: "room2.png",
        isAvaliable: false,
      },
      new Identity("5")
    );

    roomRepository.items.push(roomBooked);
    roomRepository.items.push(room);
  });
  test("should book a room", async () => {
    await useCase.handle({
      customer: "Lucas",
      email: "Lucas@gmail.com",
      days: 3,
      roomId: "2",
    });

    expect(bookingRepository.items[0].customer).toEqual("Lucas");
    expect(bookingRepository.items[0].room.isAvaliable).toBe(false);
    expect(bookingRepository.items[0].isActive).toBe(true);
    expect(bookingRepository.items[0].email.value).toEqual("Lucas@gmail.com");
    expect(bookingRepository.items[0].days).toEqual(3);
  });

  test("should not creating a book to a not existing room", async () => {
    const response = await useCase.handle({
      customer: "Lucas",
      email: "Lucas@gmail.com",
      days: 3,
      roomId: "10",
    });

    expect(response).toEqual(null);
  });
  test("should not creating a book on a unavaliable room", async () => {
    const response = await useCase.handle({
      customer: "Lucas",
      email: "luana@gmail.com",
      days: 3,
      roomId: "5",
    });

    expect(response).toEqual(null);
  });
  test("should not creating a book whit an invalid email", async () => {
    const response = await useCase.handle({
      customer: "Lucas",
      email: "luana@gmai",
      days: 3,
      roomId: "2",
    });

    expect(response).toEqual(null);
  });
});
