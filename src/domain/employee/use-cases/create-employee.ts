import Email from "../../shared/value-objects/email";
import Employee from "../entitites/employee";
import { EmployeeRepository } from "../repositories/employee-repository";
import { HashRepository } from "../services/hash-repository";

type Request = {
  name: string;
  email: string;
  password: string;
};

export default class CreateEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private hashRepository: HashRepository
  ) {}

  async handle({ name, email, password }: Request) {
    const emailExists = await this.employeeRepository.findByEmail(email);

    if (emailExists) return null;

    const emailEmployee = Email.create(email);

    if (!emailEmployee.validate()) return null;

    const hashPassword = await this.hashRepository.hash(password);

    const employee = Employee.create({
      name,
      email: emailEmployee,
      password: hashPassword,
    });

    await this.hashRepository.compare(hashPassword, password);

    await this.employeeRepository.create(employee);

    return employee;
  }
}
