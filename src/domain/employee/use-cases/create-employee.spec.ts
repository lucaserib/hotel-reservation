import Identity from "../../../core/entities/indentity";
import { InMemoryEmployeeRepository } from "../../../test/repositories/in-memory-employee-repository";
import Email from "../../shared/value-objects/email";
import Employee from "../entitites/employee";
import CreateEmployeeUseCase from "./create-employee";

let employeeRepository: InMemoryEmployeeRepository;
let useCase: CreateEmployeeUseCase;
describe("Employee Creation", () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    useCase = new CreateEmployeeUseCase(employeeRepository);
  });
  test("should create a employee", async () => {
    const employee = await useCase.handle({
      name: "Lucas Emanuel",
      email: "Lucas@gmail.com",
      password: "123abc",
    });

    expect(employeeRepository.items[0].id).toBeInstanceOf(Identity);
    expect(employeeRepository.items[0].id.toString()).toEqual(
      employee?.id.toString()
    );
    expect(employeeRepository.items[0].email.value).toEqual("Lucas@gmail.com");
    expect(employeeRepository.items[0].name).toEqual("Lucas Emanuel");
    expect(employeeRepository.items[0].password).toEqual("123abc");
  });

  test("should not create a employee with invalid email", async () => {
    const response = await useCase.handle({
      name: "Lucas Emanuel",
      email: "Lucasddwdq@",
      password: "123abc",
    });

    expect(response).toBe(null);
  });
  test("should not create a employee with email already registered", async () => {
    const employee = await Employee.create({
      name: "Lucas Emanuel",
      email: Email.create("lucas@gmail.com"),
      password: "123abc",
    });

    employeeRepository.items.push(employee);

    const response = await useCase.handle({
      name: "asdjbadiol",
      email: "lucas@gmail.com",
      password: "123abc",
    });

    expect(response).toBe(null);
  });
});
