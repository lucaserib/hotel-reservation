import Room from "../../employee/entitites/room";
import Identity from "../../../core/entities/indentity";
import { Optional } from "../../../core/types/optional";
import Email from "../../shared/value-objects/email";
import AgregateRoot from "../../../core/entities/agregate-root";

type BookingType = {
  room: Room;
  days: number;
  customer: string;
  email: Email;
  isActive: boolean;
};

export default class Booking extends AgregateRoot<BookingType> {
  static create(data: Optional<BookingType, "isActive">, id?: Identity) {
    return new Booking(
      {
        ...data,
        isActive: data.isActive ?? true,
      },
      id
    );
  }

  get room() {
    return this.attributes.room;
  }
  get days() {
    return this.attributes.days;
  }
  get customer() {
    return this.attributes.customer;
  }
  get email() {
    return this.attributes.email;
  }
  get isActive() {
    return this.attributes.isActive;
  }

  set isActive(value: boolean) {
    this.attributes.isActive = value;
  }
}
