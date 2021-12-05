"use strict";
import { readFileSync } from "fs";
import { join } from "path";

const file = readFileSync(
  join(__dirname, "..", "input", "day5.txt"),
  "utf-8"
).split("\n");

console.log(`Day 5 input file has ${file.length} lines.`);

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

type Map = Vent[][];

type ParsedLine = [Point, Point];

type Vent = Point & {
  vents: number;
};

type Point = {
  x: number;
  y: number;
};

// Utils
function createMap(size: number): Map {
  return range(0, size, 1).map((y) =>
    range(0, size, 1).map((x) => ({
      x: x,
      y: y,
      vents: 0,
    }))
  );
}

function plotLine(map: Map, line: Point[]): Map {
  line.forEach((point) => {
    map[point.y][point.x].vents += 1;
  });

  return map;
}
function createLine([start, end]: ParsedLine): Point[] {
  let result: Point[] = [];

  if (start.x === end.x) {
    result = range(
      Math.min(start.y, end.y),
      Math.max(start.y, end.y),
      1
    ).map<Point>((i) => ({
      x: start.x,
      y: i,
    }));
  } else if (start.y === end.y) {
    result = range(
      Math.min(start.x, end.x),
      Math.max(start.x, end.x),
      1
    ).map<Point>((i) => ({
      x: i,
      y: start.y,
    }));
  }
  return result;
}

function createAnyLine([start, end]: ParsedLine): Point[] {
  //   console.log(
  //     `Creating line between (${start.x},${start.y}) and (${end.x},${end.y}) `
  //   );
  let result: Point[] = [];

  if (start.x === end.x) {
    result = range(
      Math.min(start.y, end.y),
      Math.max(start.y, end.y),
      1
    ).map<Point>((i) => ({
      x: start.x,
      y: i,
    }));
  } else if (start.y === end.y) {
    result = range(
      Math.min(start.x, end.x),
      Math.max(start.x, end.x),
      1
    ).map<Point>((i) => ({
      x: i,
      y: start.y,
    }));
  } else if (end.x - start.x === start.y - end.y) {
    const values = range(
      Math.min(start.x, end.x),
      Math.max(start.x, end.x),
      1
    ).reverse();

    result = values.map<Point>((i) => ({
      x: i,
      y: -i + end.x + end.y,
    }));
  } else if (end.x - start.x === end.y - start.y) {
    const values = range(Math.min(start.x, end.x), Math.max(start.x, end.x), 1);
    result = values.map<Point>((i) => ({
      x: i,
      y: i - end.x + end.y,
    }));
  }
  return result;
}

function parseLine(points: string[]): ParsedLine {
  const start = points[0].trim();
  const end = points[1].trim();

  return [
    {
      x: parseInt(start.split(",")[0]),
      y: parseInt(start.split(",")[1]),
    },
    {
      x: parseInt(end.split(",")[0]),
      y: parseInt(end.split(",")[1]),
    },
  ];
}

const range = (start: number, stop: number, step: number): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

function getSize(text: string[]) {
  return Math.max(
    ...text
      .map((line) => line.split("->").map((s) => s.trim().split(",")))
      .flat(2)
      .map((s) => parseInt(s))
  );
}

// Part 1

function Part1(text: string[]): number {
  const map = createMap(getSize(file));
  const lineEndPoints = text.map<ParsedLine>((s) => parseLine(s.split("->")));

  const lines = lineEndPoints
    .map((line) => createLine(line))
    .filter((line) => line.length > 0);

  const updatedMap = lines.reduce(
    (prev_map: Map, line: Point[]) => plotLine(prev_map, line),
    map
  );

  return updatedMap.flat(1).filter((point) => point.vents > 1).length;
}

console.log("Part 1 test");
console.log("---------------------------");
console.log("Expect 5");
console.log(Part1(test));
console.log("===========================");

console.log("Part 1 Answer");
console.log("---------------------------");
console.log(Part1(file));
console.log("===========================");

// Part 2

function Part2(text: string[]): number {
  const map = createMap(getSize(file));
  const lineEndPoints = text.map<ParsedLine>((s) => parseLine(s.split("->")));

  const lines = lineEndPoints
    .map((line) => createAnyLine(line))
    .filter((line) => line.length > 0);

  const updatedMap = lines.reduce(
    (prev_map: Map, line: Point[]) => plotLine(prev_map, line),
    map
  );
  return updatedMap.flat(1).filter((point) => point.vents > 1).length;
}

console.log("Part 2 test");
console.log("---------------------------");
console.log("Expect 12");
console.log(Part2(test));
console.log("===========================");

console.log("Part 2 Answer");
console.log("---------------------------");
console.log(Part2(file));
console.log("===========================");
