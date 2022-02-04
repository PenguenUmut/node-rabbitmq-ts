import { main } from "./app";

test("app test", (done) => {
  const result = main("World!");
  expect(result).toEqual("Hello World!");
  done();
});
