import Identity from "../../../core/entities/indentity";
import { EmployeeRepository } from "../repositories/employee-repository";

type Response = {
  id: string;
};

export class GetEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async handle({ id }: Response) {
    const employees = await this.employeeRepository.findById(id);

    if (!employees) return null;

    return employees;
  }
}
