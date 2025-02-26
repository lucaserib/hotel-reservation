import { Either, left, right } from "./either";

const testValue = (value: boolean): Either<string, number> => {
  if (value) return right(123);
  return left("invalid");
};

describe("Error handling ", () => {
  test("Should test one case of success", () => {
    const result = testValue(true);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
  });

  test("Should test one case of error", () => {
    const result = testValue(false);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
  });
});
