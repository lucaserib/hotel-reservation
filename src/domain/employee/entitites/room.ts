import { randomUUID } from "node:crypto";

type RoomType = {
  name: string;
  price: string;
  image: string;
  hasWifi: boolean;
  hasAir: boolean;
  hasKitchen: boolean;
  isPetFriendly: boolean;
  isAvaliable: boolean;
};

export default class Room {
  private id: string;
  private name: string;
  private price: string;
  private image: string;
  private hasWifi: boolean;
  private hasAir: boolean;
  private hasKitchen: boolean;
  private isPetFriendly: boolean;
  private isAvaliable: boolean;

  constructor(data: RoomType, id?: string) {
    this.name = data.name;
    this.price = data.price;
    this.image = data.image;
    this.hasWifi = data.hasWifi;
    this.hasAir = data.hasAir;
    this.hasKitchen = data.hasKitchen;
    this.isPetFriendly = data.isPetFriendly;
    this.isAvaliable = data.isAvaliable;
    this.id = id ?? randomUUID();
  }
}
