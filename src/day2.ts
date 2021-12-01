"use strict";
import { readFileSync } from "fs";
import { join } from "path";

const file = readFileSync(
  join(__dirname, "..", "input", "day2.txt"),
  "utf-8"
).split("\n");

console.log(`Day 2 input file has ${file.length} entries.`);

const test = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2",
];

type Command = "forward" | "down" | "up";

type Position = {
  horizontal: number;
  depth: number;
  aim: number;
};

// Part 1
export function ChartCourse(commands: string[]): Position {
  let position: Position = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };

  commands.forEach((command) => {
    const [direction, value] = command.split(" ");

    switch (<Command>direction) {
      case "forward":
        position.horizontal += +value;
        break;
      case "up":
        position.depth -= +value;
        break;
      case "down":
        position.depth += +value;
        break;
      default:
        console.log("Something went wrong!");
        console.log(`Command was ${direction} ${value}`);
    }
  });

  return position;
}

console.log("Part 1 test");
console.log("---------------------------");
console.log("Expected horizontal = 15 and depth = 10 so a total of 150.");
console.log(ChartCourse(test));
console.log("===========================");

console.log("Part 1 Answer");
console.log("---------------------------");
const answer1 = ChartCourse(file);
console.log(answer1.horizontal * answer1.depth);
console.log("===========================");
// Part 2

export function ChartCourse2(commands: string[]): Position {
  let position: Position = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };

  commands.forEach((command) => {
    const direction: Command = <Command>command.split(" ")[0];
    const value: number = parseInt(command.split(" ")[1]);

    switch (direction) {
      case "up":
        position.aim -= value;
        break;
      case "down":
        position.aim += value;
        break;
      case "forward":
        position.horizontal += value;
        position.depth += position.aim * value;
        break;
      default:
        console.log("Something went wrong!");
        console.log(`Command was ${direction} ${value}`);
    }
  });

  return position;
}

console.log("Part 2 test");
console.log("---------------------------");
console.log(ChartCourse2(test));
console.log("===========================");
console.log("Part 2 Answer");
console.log("---------------------------");
const answer2 = ChartCourse2(file);
console.log(answer2.horizontal * answer2.depth);
console.log("===========================");
