import Entity from "../../../core/entities/entity";
import Identity from "../../../core/entities/indentity";
import { Optional } from "../../../core/types/optional";
import Money from "../../shared/value-objects/money";

type RoomType = {
  name: string;
  price: Money;
  image: string;
  hasWifi: boolean;
  hasAir: boolean;
  hasKitchen: boolean;
  isPetFriendly: boolean;
  isAvaliable: boolean;
};

export default class Room extends Entity<RoomType> {
  static create(
    data: Optional<
      RoomType,
      "hasWifi" | "hasAir" | "hasKitchen" | "isPetFriendly" | "isAvaliable"
    >,
    id?: Identity
  ) {
    return new Room(
      {
        ...data,
        hasWifi: data.hasWifi ?? false,
        hasAir: data.hasAir ?? false,
        hasKitchen: data.hasKitchen ?? false,
        isPetFriendly: data.isPetFriendly ?? false,
        isAvaliable: data.isAvaliable ?? true,
      },
      id
    );
  }

  get name() {
    return this.attributes.name;
  }
  get price() {
    return this.attributes.price;
  }
  get image() {
    return this.attributes.image;
  }
  get hasWifi() {
    return this.attributes.hasWifi;
  }
  get hasAir() {
    return this.attributes.hasAir;
  }
  get hasKitchen() {
    return this.attributes.hasKitchen;
  }
  get isPetFriendly() {
    return this.attributes.isPetFriendly;
  }
  get isAvaliable() {
    return this.attributes.isAvaliable;
  }
  set name(value: string) {
    this.attributes.name = value;
  }
  set price(value: Money) {
    this.attributes.price = value;
  }
  set image(value: string) {
    this.attributes.image = value;
  }
  set hasWifi(value: boolean) {
    this.attributes.hasWifi = value;
  }
  set hasAir(value: boolean) {
    this.attributes.hasAir = value;
  }
  set hasKitchen(value: boolean) {
    this.attributes.hasKitchen = value;
  }
  set isPetFriendly(value: boolean) {
    this.attributes.isPetFriendly = value;
  }
  set isAvaliable(value: boolean) {
    this.attributes.isAvaliable = value;
  }
}
