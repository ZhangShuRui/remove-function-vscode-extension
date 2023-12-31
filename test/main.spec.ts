import { test, expect } from "vitest";

import { getFunctionNode } from "../src/main";

test("init", () => {
  const code = `
  function getName() {
    return 'name'
  }
  function getNameA() {
    return 'nameA'
  }
  const arrowFunc = ()=>"i am arrow function";
  `;
  const cursorIndex = 10;

  const functionNode = getFunctionNode(code, cursorIndex);

  expect(functionNode).toEqual({
    name: "getName",
    start: { column: 2, index: 3, line: 2 },
    end: { column: 3, index: 45, line: 4 },
  });
});

test("arrow function", () => {
  const code = `
  const arrowFunc = ()=>"i am arrow function";
  `;

  const cursorIndex = 10;

  const functionNode = getFunctionNode(code, cursorIndex);

  expect(functionNode).toEqual({
    name: "arrowFunc",
    start: { column: 2, index: 3, line: 2 },
    end: { column: 46, index: 47, line: 2 },
  });
});
