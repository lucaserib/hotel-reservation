import { InvalidCredentialsError } from "../../../core/errors/custom-errors/invalid-credentials-error";
import { Either, left, right } from "../../../core/errors/either/either";
import Employee from "../entitites/employee";
import { EmployeeRepository } from "../repositories/employee-repository";
import { HashRepository } from "../services/hash-repository";
import { TokenRepository } from "../services/token-repository";

type Request = {
  email: string;
  password: string;
};

type ResponseAuth = {
  employee: Employee;
  token: string;
};

type Response = Either<InvalidCredentialsError, ResponseAuth>;

export class AuthEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private hashRepository: HashRepository,
    private tokenRepository: TokenRepository
  ) {}
  async handle({ email, password }: Request): Promise<Response> {
    const employee = await this.employeeRepository.findByEmail(email);

    if (!employee) return left(new InvalidCredentialsError());

    const validPassword = await this.hashRepository.compare(
      password,
      employee.password
    );

    if (!validPassword) return left(new InvalidCredentialsError());

    const token = await this.tokenRepository.generate({
      id: employee.id.toString(),
      email: employee.email.value,
      name: employee.name,
    });

    return right({ employee, token });
  }
}
