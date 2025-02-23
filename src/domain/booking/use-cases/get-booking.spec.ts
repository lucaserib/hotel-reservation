import Identity from "../../../core/entities/indentity";
import { InMemoryBookingRepository } from "../../../test/repositories/in-memory-booking-repository";
import { InMemoryRoomRepository } from "../../../test/repositories/in-memory-room-repository";
import Room from "../../employee/entitites/room";
import { GetRoomUseCase } from "../../employee/use-cases/get-room";
import Email from "../../shared/value-objects/email";
import Money from "../../shared/value-objects/money";
import Booking from "../entities/booking";
import { GetBookingUseCase } from "./get-booking";

let bookingRepository: InMemoryBookingRepository;
let roomRepository: InMemoryRoomRepository;
let useCase: GetBookingUseCase;
describe("Get Booking datails", () => {
  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    bookingRepository = new InMemoryBookingRepository();
    useCase = new GetBookingUseCase(bookingRepository);
  });
  test("should return the Booking by the ID", async () => {
    const room = Room.create({
      name: "Presidential Suite",
      price: Money.create(125000),
      image: "room.png",
    });

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

    const response = await useCase.handle({
      id: "1",
    });

    expect(response?.customer).toEqual("Lucas");
  });

  test("should not return a Booking whit invalid id", async () => {
    const response = await useCase.handle({
      id: "2",
    });

    expect(response).toEqual(null);
  });
});
