import add from "./math";

describe("add function", () => {
  it("should correctly add two positive numbers", () => {
    expect(add(1, 2)).toBe(3);
  });

  it("should correctly add positive and negative numbers", () => {
    expect(add(-1, 1)).toBe(0);
  });

  it("should correctly add two negative numbers", () => {
    expect(add(-1, -1)).toBe(-2);
  });
});
