import Identity from "../../../core/entities/indentity";
import { InMemoryBookingRepository } from "../../../test/repositories/in-memory-booking-repository";
import { InMemoryEmployeeRepository } from "../../../test/repositories/in-memory-employee-repository";
import Employee from "../entitites/employee";
import Email from "../../shared/value-objects/email";
import { DeleteEmployeeUsecase } from "./delete-employee";

let employeeRepository: InMemoryEmployeeRepository;
let useCase: DeleteEmployeeUsecase;
describe("Delete employee", () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    useCase = new DeleteEmployeeUsecase(employeeRepository);

    const employee = Employee.create(
      {
        name: "Lucas Emanuel",
        email: Email.create("lucas@gmail.com"),
        password: "123abc",
      },
      new Identity("1")
    );
    employeeRepository.items.push(employee);
  });
  test("Should delete a employee", async () => {
    expect(employeeRepository.items).toHaveLength(1);

    const response = await useCase.handle({
      id: "1",
    });

    expect(response.isRight()).toBe(true);
    expect(employeeRepository.items).toHaveLength(0);
  });

  test("Should not delete a employee with an invalid id", async () => {
    const response = await useCase.handle({
      id: "10",
    });

    expect(response.isLeft()).toBe(true);
  });
});
