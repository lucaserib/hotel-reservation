import { TokenRepository } from "../../domain/employee/services/token-repository";

export class TokenSimulator implements TokenRepository {
  generate(value: Record<string, unknown>): string {
    return JSON.stringify(value);
  }
}
