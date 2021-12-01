"use strict";
import { readFileSync } from "fs";
import { join } from "path";

// Part 1
function part1(values: number[]): number {
  let total = 0;
  values.reduce((previous, current) => {
    if (current - previous > 0) {
      total++;
    }
    return current;
  });
  return total;
}

// Testing
const test = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
console.log("Part 1 test");
console.log(part1(test));

// Answer
const file = readFileSync(join(__dirname, "..", "input", "day1.txt"), "utf-8")
  .split("\n")
  .map((s) => parseInt(s));
console.log("Part 1 Answer");
console.log(part1(file));

//---------------------------------------------

// Part 2
function createsSlidingWindows(values: number[]): number[] {
  return values
    .map((value, index, array) => {
      return value + array[index + 1] + array[index + 2];
    })
    .slice(0, values.length - 2);
}

// test
console.log("Part 2 Test");
console.log(createsSlidingWindows(test));
console.log(part1(createsSlidingWindows(test)));

// Answer
console.log("Part 2 Answer");
console.log(part1(createsSlidingWindows(file)));
