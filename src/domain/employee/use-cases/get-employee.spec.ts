import { InMemoryEmployeeRepository } from "../../../test/repositories/in-memory-employee-repository";
import Email from "../../shared/value-objects/email";
import Employee from "../entitites/employee";
import { GetEmployeeUseCase } from "./get-employee";

let employeeRepository: InMemoryEmployeeRepository;
let useCase: GetEmployeeUseCase;
describe("Employee details", () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    useCase = new GetEmployeeUseCase(employeeRepository);
  });
  test("should return the employee by the ID", async () => {
    const employee = Employee.create({
      name: "Presidential Suite",
      email: Email.create("lucas@gmail.com"),
      password: "123abc",
    });

    employeeRepository.items.push(employee);

    const response = await useCase.handle({
      id: employee.id.toString(),
    });

    expect(response.isRight()).toBe(true);
    expect(response!.value.name).toEqual("Presidential Suite");
  });

  test("should not return a employee whit invalid id", async () => {
    const response = await useCase.handle({
      id: "1",
    });

    expect(response.isLeft()).toBe(true);
  });
});
