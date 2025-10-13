import { expect, test } from "bun:test";

test("example addition", () => {
  expect(2 + 2).toBe(4);
});

test("example string comparison", () => {
  expect("hello world").toContain("world");
});

test("example async test", async () => {
  const result = await Promise.resolve(42);
  expect(result).toBe(42);
});
