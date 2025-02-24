import { InMemoryEmployeeRepository } from "../../../test/repositories/in-memory-employee-repository";
import Email from "../../shared/value-objects/email";
import Money from "../../shared/value-objects/money";
import Employee from "../entitites/employee";
import { ListEmployeesUseCase } from "./list-employees";

let employeeRepository: InMemoryEmployeeRepository;
let useCase: ListEmployeesUseCase;
describe("Employee List", () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    useCase = new ListEmployeesUseCase(employeeRepository);
  });
  test("should list an array of employees", async () => {
    const employee = Employee.create({
      name: "Presidential Suite",
      email: Email.create("lucas@gmail.com"),
      password: "123abc",
    });

    employeeRepository.items.push(employee);

    const response = await useCase.handle();

    expect(response).toHaveLength(1);
  });

  test("should list an empty array", async () => {
    const response = await useCase.handle();

    expect(response).toHaveLength(0);
  });
});
