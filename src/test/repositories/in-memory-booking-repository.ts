import Booking from "../../domain/booking/entities/booking";
import { BookingRepository } from "../../domain/booking/repositories/booking-repository";

export class InMemoryBookingRepository implements BookingRepository {
  items: Booking[] = [];

  async create(booking: Booking) {
    this.items.push(booking);
    return booking;
  }

  async findMany() {
    return this.items;
  }

  async findById(id: string) {
    const booking = this.items.find((item) => item.id.toString() === id);
    if (!booking) return null;

    return booking;
  }

  async cancel(booking: Booking) {
    const bookingIndex = this.items.findIndex((item) => item.id === booking.id);
    this.items[bookingIndex] = booking;
  }

  async findByRoomId(roomId: string) {
    const booking = this.items.find(
      (item) => item.room.id.toString() === roomId
    );

    if (!booking) return null;

    return booking;
  }
}
