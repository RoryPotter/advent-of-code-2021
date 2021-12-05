"use strict";
import { readFileSync } from "fs";
import { join } from "path";

const file = readFileSync(
  join(__dirname, "..", "input", "day6.txt"),
  "utf-8"
).split("\n");

console.log(`Day 6 input file has ${file.length} lines.`);

const test = [
  "0,9 -> 5,9",
  "8,0 -> 0,8",
  "9,4 -> 3,4",
  "2,2 -> 2,1",
  "7,0 -> 7,4",
  "6,4 -> 2,0",
  "0,9 -> 2,9",
  "3,4 -> 1,4",
  "0,0 -> 8,8",
  "5,5 -> 8,2",
];

// Types

// Utils

// Part 1

function Part1(text: string[]): number {
  return text.length;
}

console.log("Part 1 test");
console.log("---------------------------");
console.log("Expect ?");
console.log(Part1(test));
console.log("===========================");

console.log("Part 1 Answer");
console.log("---------------------------");
// console.log(Part1(file));
console.log("===========================");

// Part 2

function Part2(text: string[]): number {
  return -2;
}

console.log("Part 2 test");
console.log("---------------------------");
console.log("Expect ?");
console.log(Part2(test));
console.log("===========================");

console.log("Part 2 Answer");
console.log("---------------------------");
console.log(Part2(file));
console.log("===========================");
