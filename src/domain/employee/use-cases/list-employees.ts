import { EmployeeRepository } from "../repositories/employee-repository";

export class ListEmployeesUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}
  async handle() {
    const employees = await this.employeeRepository.findMany();
    return employees;
  }
}
