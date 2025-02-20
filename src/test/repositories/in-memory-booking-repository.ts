import Booking from "../../domain/booking/entities/booking";
import { BookingRepository } from "../../domain/booking/repositories/booking-repository";

export class InMemoryBookingRepository implements BookingRepository {
  items: Booking[] = [];

  async create(booking: Booking) {
    this.items.push(booking);
    return booking;
  }

  async findMany(): Promise<Booking[]> {
    return this.items;
  }
}
