import { InvalidEmailError } from "../../../core/errors/custom-errors/invalid-email";
import { NotAllowedError } from "../../../core/errors/custom-errors/not-allowed-error";
import { Either, left, right } from "../../../core/errors/either/either";
import Email from "../../shared/value-objects/email";
import Employee from "../entitites/employee";
import { EmployeeRepository } from "../repositories/employee-repository";
import { HashRepository } from "../services/hash-repository";

type Request = {
  name: string;
  email: string;
  password: string;
};

type Response = Either<NotAllowedError | InvalidEmailError, Employee>;

export default class CreateEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private hashRepository: HashRepository
  ) {}

  async handle({ name, email, password }: Request): Promise<Response> {
    const emailExists = await this.employeeRepository.findByEmail(email);

    if (emailExists) return left(new NotAllowedError()); // not allowed

    const emailEmployee = Email.create(email);

    if (!emailEmployee.validate()) return left(new InvalidEmailError()); // invalid email

    const hashPassword = await this.hashRepository.hash(password);

    const employee = Employee.create({
      name,
      email: emailEmployee,
      password: hashPassword,
    });

    await this.hashRepository.compare(hashPassword, password);

    await this.employeeRepository.create(employee);

    return right(employee);
  }
}
