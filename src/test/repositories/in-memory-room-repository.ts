import Room from "../../domain/employee/entitites/room";
import { RoomRepository } from "../../domain/employee/repositories/room-repository";

export class InMemoryRoomRepository implements RoomRepository {
  items: Room[] = [];

  async create(room: Room) {
    this.items.push(room);
    return room;
  }

  async findMany() {
    return this.items;
  }

  async findById(id: string): Promise<Room | null> {
    const room = this.items.find((item) => item.id.toString() === id);

    if (!room) {
      return null;
    }
    return room;
  }
}
