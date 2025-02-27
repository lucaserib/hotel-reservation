import Identity from "../../../core/entities/indentity";
import { InMemoryEmployeeRepository } from "../../../test/repositories/in-memory-employee-repository";
import { HashSimulator } from "../../../test/services/hashSimulator";
import Email from "../../shared/value-objects/email";
import Employee from "../entitites/employee";
import { EditEmployeeRepository } from "./edit-employee";

let employeeRepository: InMemoryEmployeeRepository;
let hashRepository: HashSimulator;
let useCase: EditEmployeeRepository;

describe("Employee Edit", () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    hashRepository = new HashSimulator();
    useCase = new EditEmployeeRepository(employeeRepository, hashRepository);
  });
  test("Should edit an employee", async () => {
    const employee = Employee.create({
      name: "Presidential Suite",
      email: Email.create("lucas@gmail.com"),
      password: "abc123",
    });

    employeeRepository.items.push(employee);

    const response = await useCase.handle({
      id: employee.id.toString(),
      name: "Lucas Emanuel",
      email: "lucasemanuel@gmail.com",
      password: "abc123",
    });

    const hashedPassword = await hashRepository.hash("abc123");

    expect(response.isRight()).toBe(true);
    expect(employeeRepository.items[0].name).toEqual("Lucas Emanuel");
    expect(employeeRepository.items[0].email.value).toEqual(
      "lucasemanuel@gmail.com"
    );
    expect(employeeRepository.items[0].password).toEqual(hashedPassword);
  });

  test("Should not edit a employee with invalid id", async () => {
    const response = await useCase.handle({
      id: "1",
      name: "Lucas",
      email: "lucas@gmail.com",
      password: "123",
    });

    expect(response.isLeft()).toBe(true);
  });
  test("Should not edit a employee with invalid email format", async () => {
    const luana = await Employee.create(
      {
        name: "Luana",
        email: Email.create("luana@gmail.com"),
        password: "123",
      },
      new Identity("1")
    );
    await employeeRepository.items.push(luana);

    const response = await useCase.handle({
      id: luana.id.toString(),
      name: "Luana",
      email: "luana.com",
      password: "123",
    });

    expect(response.isLeft()).toBe(true);
  });
  test("Should not edit a employee with an email that already exists to another employee", async () => {
    const luana = await Employee.create(
      {
        name: "luana",
        email: Email.create("luana@gmail.com"),
        password: "123",
      },
      new Identity("2")
    );

    employeeRepository.items.push(luana);

    const carlos = await Employee.create({
      name: "luana",
      email: Email.create("carlos@gmail.com"),
      password: "123",
    });

    employeeRepository.items.push(carlos);

    const response = await useCase.handle({
      id: "2",
      name: "luana",
      email: "carlos@gmail.com",
      password: "123",
    });

    expect(response.isLeft()).toBe(true);
  });
});
