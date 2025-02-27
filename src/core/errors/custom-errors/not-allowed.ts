import { BaseError } from "../base-error";

export class NotAllowed extends BaseError {
  constructor() {
    super("Not Allowed");
  }
}
