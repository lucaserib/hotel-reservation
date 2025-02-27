import { BaseError } from "../base-error";

export class RoomUnavailableError extends BaseError {
  constructor() {
    super("Room Unavailable");
  }
}
