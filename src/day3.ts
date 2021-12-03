"use strict";
import { readFileSync } from "fs";
import { join } from "path";

const file = readFileSync(
  join(__dirname, "..", "input", "day3.txt"),
  "utf-8"
).split("\n");

console.log(`Day 3 input file has ${file.length} entries.`);

const test = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

function transpose<T>(matrix: T[][]): T[][] {
  return matrix.reduce(
    (prev: T[][], next: T[]) =>
      next.map((_, i) => (prev[i] || []).concat(next[i])),
    []
  );
}

// Part 1

function Part1(data: string[]): number {
  const matrix = data.map((d) => d.split(""));

  const transposed = transpose<string>(matrix);

  const rates = transposed
    .map((d) => {
      const counts = [
        d.filter((s) => s == "0").length,
        d.filter((s) => s == "1").length,
      ];
      const gamma = counts[0] > counts[1] ? "0" : "1";
      const epsilon = gamma == "1" ? "0" : "1";
      return { gamma: gamma, epsilon: epsilon };
    })
    .reduce(
      (prev, x) => ({
        gamma: [prev.gamma, x.gamma].join(""),
        epsilon: [prev.epsilon, x.epsilon].join(""),
      }),
      { gamma: "", epsilon: "" }
    );

  console.log(rates);

  return parseInt(rates.gamma, 2) * parseInt(rates.epsilon, 2);
}

console.log("Part 1 test");
console.log("---------------------------");
console.log("Expect 22 * 9 = 198");
console.log(Part1(test));
console.log("===========================");

console.log("Part 1 Answer");
console.log("---------------------------");
console.log(Part1(file));
console.log("===========================");

// Part 2

function generateBitRating(bit: string[]) {
  const counts = [
    bit.filter((s) => s == "0").length,
    bit.filter((s) => s == "1").length,
  ];
  const max = counts[1] >= counts[0] ? "1" : "0";
  const min = counts[0] <= counts[1] ? "0" : "1";
  return { max: max, min: min };
}

function Part2(data: string[]): number {
  const matrix = data.map((d) => d.split(""));

  const transposed = transpose<string>(matrix);
  const bitLength = transposed.length;

  const readings = Array.from({ length: bitLength }, (_, i) => i).reduce(
    (prev, index) => {
      const oxygenBits = transpose<string>(prev.oxygen)[index];
      const co2Bits = transpose<string>(prev.co2)[index];

      return {
        oxygen:
          prev.oxygen.length == 1
            ? prev.oxygen
            : prev.oxygen.filter(
                (reading) =>
                  reading[index] === generateBitRating(oxygenBits).max
              ),
        co2:
          prev.co2.length == 1
            ? prev.co2
            : prev.co2.filter(
                (reading) => reading[index] === generateBitRating(co2Bits).min
              ),
      };
    },
    {
      oxygen: matrix,
      co2: matrix,
    }
  );

  console.log([readings.oxygen[0].join(""), readings.co2[0].join("")]);

  return (
    parseInt(readings.oxygen[0].join(""), 2) *
    parseInt(readings.co2[0].join(""), 2)
  );
}

console.log("Part 2 test");
console.log("---------------------------");
console.log(Part2(test));
console.log("===========================");

console.log("Part 2 Answer");
console.log("---------------------------");
console.log(Part2(file));
console.log("===========================");
