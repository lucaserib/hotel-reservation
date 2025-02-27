import { InvalidEmailError } from "../../../core/errors/custom-errors/invalid-email";
import { NotAllowedError } from "../../../core/errors/custom-errors/not-allowed-error";
import { NotFoundError } from "../../../core/errors/custom-errors/not-found-error";
import { Either, left, right } from "../../../core/errors/either/either";
import Email from "../../shared/value-objects/email";
import Money from "../../shared/value-objects/money";
import Employee from "../entitites/employee";
import { EmployeeRepository } from "../repositories/employee-repository";
import { HashRepository } from "../services/hash-repository";

type Request = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type Response = Either<
  NotFoundError | NotAllowedError | InvalidEmailError,
  Employee
>;

export class EditEmployeeRepository {
  constructor(
    private employeeRepository: EmployeeRepository,
    private hashRepository: HashRepository
  ) {}
  async handle({ id, name, email, password }: Request): Promise<Response> {
    const employee = await this.employeeRepository.findById(id);

    if (!employee) return left(new NotFoundError());

    const emailEmployee = await Email.create(email);
    if (!emailEmployee.validate()) return left(new InvalidEmailError());

    const emailExists = await this.employeeRepository.findByEmail(email);
    if (emailExists && emailExists.id.toString() !== id) {
      return left(new NotAllowedError());
    }

    const hashedPassword = await this.hashRepository.hash(password);

    employee.name = name;
    employee.email = emailEmployee;
    employee.password = hashedPassword;

    return right(employee);
  }
}
