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

export class CreateBookingUseCase {
  constructor(
    private roomRepository: RoomRepository,
    private bookingRepository: BookingRepository
  ) {}
  async handle({ customer, roomId, email, days }: Request) {
    const roomExists = await this.roomRepository.findById(roomId);

    if (!roomExists) return null;

    if (!roomExists.isAvaliable) return null;

    const emailObject = Email.create(email);

    if (!emailObject.validate()) return null;

    const booking = Booking.create({
      customer,
      email: emailObject,
      days,
      room: roomExists,
    });

    await this.bookingRepository.create(booking);

    roomExists.isAvaliable = false;

    await this.roomRepository.save(roomExists);

    return booking;
  }
}
