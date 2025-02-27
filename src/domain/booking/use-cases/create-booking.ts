import { InvalidEmailError } from "../../../core/errors/custom-errors/invalid-email";
import { NotAllowedError } from "../../../core/errors/custom-errors/not-allowed-error";
import { NotFoundError } from "../../../core/errors/custom-errors/not-found-error";
import { RoomUnavailableError } from "../../../core/errors/custom-errors/room-unavailable-error";
import { Either, left, right } from "../../../core/errors/either/either";
import Room from "../../employee/entitites/room";
import { RoomRepository } from "../../employee/repositories/room-repository";
import Email from "../../shared/value-objects/email";
import Booking from "../entities/booking";
import { BookingRepository } from "../repositories/booking-repository";

type Request = {
  roomId: string;
  days: number;
  customer: string;
  email: string;
};

type Response = Either<
  NotFoundError | RoomUnavailableError | InvalidEmailError,
  Booking
>;

export class CreateBookingUseCase {
  constructor(
    private roomRepository: RoomRepository,
    private bookingRepository: BookingRepository
  ) {}
  async handle({ customer, roomId, email, days }: Request): Promise<Response> {
    const roomExists = await this.roomRepository.findById(roomId);

    if (!roomExists) return left(new NotFoundError());

    if (!roomExists.isAvaliable) return left(new RoomUnavailableError());

    const emailObject = Email.create(email);

    if (!emailObject.validate()) return left(new InvalidEmailError());

    const booking = Booking.create({
      customer,
      email: emailObject,
      days,
      room: roomExists,
    });

    await this.bookingRepository.create(booking);

    roomExists.isAvaliable = false;

    await this.roomRepository.save(roomExists);

    return right(booking);
  }
}
