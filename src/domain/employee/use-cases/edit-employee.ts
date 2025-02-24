import Email from "../../shared/value-objects/email";
import Money from "../../shared/value-objects/money";
import { EmployeeRepository } from "../repositories/employee-repository";
import { HashRepository } from "../services/hash-repository";

type Request = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export class EditEmployeeRepository {
  constructor(
    private employeeRepository: EmployeeRepository,
    private hashRepository: HashRepository
  ) {}
  async handle({ id, name, email, password }: Request) {
    const employee = await this.employeeRepository.findById(id);

    if (!employee) return null;

    const emailEmployee = await Email.create(email);
    if (!emailEmployee.validate()) return null;

    const emailExists = await this.employeeRepository.findByEmail(email);
    if (emailExists && emailExists.id.toString() !== id) {
      return null;
    }

    const hashedPassword = await this.hashRepository.hash(password);

    employee.name = name;
    employee.email = emailEmployee;
    employee.password = hashedPassword;

    return employee;
  }
}
