import { InMemoryEmployeeRepository } from "../../../test/repositories/in-memory-employee-repository";
import { HashSimulator } from "../../../test/services/hashSimulator";
import { TokenSimulator } from "../../../test/services/token";
import Email from "../../shared/value-objects/email";
import Employee from "../entitites/employee";
import { AuthEmployeeUseCase } from "./auth-employee";

let employeeRepository: InMemoryEmployeeRepository;
let hashRepository: HashSimulator;
let tokenRepository: TokenSimulator;
let useCase: AuthEmployeeUseCase;

describe("Employee Authenticate", () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    hashRepository = new HashSimulator();
    tokenRepository = new TokenSimulator();
    useCase = new AuthEmployeeUseCase(
      employeeRepository,
      hashRepository,
      tokenRepository
    );
  });
  test("Should authenticate an employee", async () => {
    const hashedPassword = await hashRepository.hash("abc123");

    const employee = Employee.create({
      name: "Lucas",
      email: Email.create("lucas@gmail.com"),
      password: hashedPassword,
    });

    employeeRepository.items.push(employee);

    const response = await useCase.handle({
      email: "lucas@gmail.com",
      password: "abc123",
    });

    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual({
      token: expect.any(String),
      employee: expect.any(Employee),
    });
  });

  test("Should not authenticate a employee with an invalid email", async () => {
    const hashedPassword = await hashRepository.hash("abc123");

    const employee = Employee.create({
      name: "Lucas",
      email: Email.create("lucas@gmail.comd"),
      password: hashedPassword,
    });

    employeeRepository.items.push(employee);

    const response = await useCase.handle({
      email: "maria@gmail.com",
      password: "abc123",
    });

    expect(response.isLeft()).toBe(true);
  });

  test("Should not authenticate a employee with invalid credentials", async () => {
    const hashedPassword = await hashRepository.hash("abc123");

    const employee = Employee.create({
      name: "Lucas",
      email: Email.create("lucas@gmail.com"),
      password: hashedPassword,
    });

    employeeRepository.items.push(employee);

    const response = await useCase.handle({
      email: "lucas@gmail.com",
      password: "12345",
    });

    expect(response.isLeft()).toBe(true);
  });
});
