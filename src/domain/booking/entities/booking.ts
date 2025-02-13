import { randomUUID } from "node:crypto";
import Room from "../../employee/entitites/room";

type BookingType = {
  room: Room;
  days: number;
  customer: string;
  email: string;
  isActive: boolean;
};

export default class Booking {
  private id: string;
  private room: Room;
  private days: number;
  private customer: string;
  private email: string;
  private isActive: boolean;

  constructor(data: BookingType, id?: string) {
    this.room = data.room;
    this.days = data.days;
    this.customer = data.customer;
    this.email = data.email;
    this.isActive = data.isActive;
    this.id = id ?? randomUUID();
  }
}
