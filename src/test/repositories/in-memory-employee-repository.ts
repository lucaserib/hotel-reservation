import Employee from "../../domain/employee/entitites/employee";
import Room from "../../domain/employee/entitites/room";
import { EmployeeRepository } from "../../domain/employee/repositories/employee-repository";

export class InMemoryEmployeeRepository implements EmployeeRepository {
  items: Employee[] = [];

  async create(employee: Employee) {
    this.items.push(employee);
    return employee;
  }

  async findMany() {
    return this.items;
  }

  async findById(id: string) {
    const employee = this.items.find((item) => item.id.toString() === id);

    if (!employee) return null;
    return employee;
  }

  async findByEmail(email: string) {
    const employee = this.items.find((item) => item.email.value === email);

    if (!employee) return null;
    return employee;
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id);

    this.items.splice(itemIndex, 1);
  }
}
