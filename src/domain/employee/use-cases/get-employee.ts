import { EmployeeRepository } from "../repositories/employee-repository";

type Request = {
  id: string;
};

export class GetEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async handle({ id }: Request) {
    const employees = await this.employeeRepository.findById(id);

    if (!employees) return null;

    return employees;
  }
}
