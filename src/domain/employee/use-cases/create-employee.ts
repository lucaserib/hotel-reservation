import Email from "../../shared/value-objects/email";
import Employee from "../entitites/employee";
import { EmployeeRepository } from "../repositories/employee-repository";

type Request = {
  name: string;
  email: string;
  password: string;
};

export default class CreateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async handle({ name, email, password }: Request) {
    const emailExists = await this.employeeRepository.findByEmail(email);

    if (emailExists) return null;

    const emailEmployee = Email.create(email);

    if (!emailEmployee.validate) return null;

    const employee = Employee.create({ name, email: emailEmployee, password });

    await this.employeeRepository.create(employee);

    return employee;
  }
}
