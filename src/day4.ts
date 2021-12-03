"use strict";
import { readFileSync } from "fs";
import { join } from "path";

const file = readFileSync(join(__dirname, "..", "input", "day4.txt"), "utf-8");

console.log(`Day 4 input file has ${file.length} lines.`);

const test: string = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
 `;

// Types

interface Game {
  input: number[];
  boards: Board[];
}

type Board = {
  id: number;
  points: Point[];
  bingo: boolean;
};

type Point = {
  value: number;
  called: boolean;
  x: number;
  y: number;
};

type Winner = {
  finalBoard: Board;
  winningRound: number;
};

// Utils

function parseInput(input: string): Game {
  const [random, ...boards] = input.split("\n\n");

  return {
    input: random
      .trim()
      .split(",")
      .map((i) => parseInt(i)),
    boards: boards.map((board, index) => generateBoard(board, index)),
  };
}

function generateBoard(boardString: string, id: number): Board {
  return {
    points: boardString
      .split("\n")
      .map((row, row_index) =>
        row
          .split(" ")
          .filter((s) => s != "")
          .map((i, col_index) => ({
            value: parseInt(i),
            called: false,
            x: col_index,
            y: row_index,
          }))
      )
      .flat(),
    bingo: false,
    id: id,
  };
}

function updateBoard({ id, points, bingo }: Board, called: number): Board {
  return {
    id: id,
    points: points.map((point: Point) =>
      point.value === called ? { ...point, called: true } : point
    ),
    bingo: bingo,
  };
}

function checkForBingo(board: Board): Board {
  const calledValues = board.points.filter((point) => point.called);

  if (calledValues.length >= 5) {
    const index: number[] = sequence(5);

    // Check X co-ordinates for bingo
    const xCalled = index
      .map((x) => calledValues.filter((point) => point.x === x).length === 5)
      .some((x) => x);

    if (xCalled) {
      return { ...board, bingo: true };
    }
    // Check Y co-ordinates
    const yCalled = index
      .map((y) => calledValues.filter((point) => point.y === y).length === 5)
      .some((y) => y);

    if (yCalled) {
      return { ...board, bingo: true };
    }
  }

  return board;
}

function sequence(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}

// Part 1

function Part1(game: string) {
  let { input, boards } = parseInput(game);
  let finalInput: number;

  for (let round = 0; round < input.length; round++) {
    boards = boards.map((board) =>
      checkForBingo(updateBoard(board, input[round]))
    );

    if (boards.some((board) => board.bingo)) {
      finalInput = input[round];
      break;
    }
  }

  const winner = boards.filter((board) => board.bingo);

  const scores = winner
    .map((board) =>
      board.points
        .filter((point) => !point.called)
        .reduce((prev: number, next: Point) => prev + next.value, 0)
    )
    .map((score: number) => score * finalInput);

  return scores;
}

console.log("Part 1 test");
console.log("---------------------------");
console.log("Expect 4512");
console.log(Part1(test)[0]);
console.log("===========================");

console.log("Part 1 Answer");
console.log("---------------------------");
console.log(Part1(file)[0]);
console.log("===========================");

// Part 2

// Need to work out which board would win last.

function Part2(game: string): number {
  let { input, boards } = parseInput(game);
  let finalInput: number;

  let winners: Winner[] = [];

  for (let round = 0; round < input.length; round++) {
    if (boards === []) {
      break;
    }
    boards = boards.map((board) =>
      checkForBingo(updateBoard(board, input[round]))
    );

    let winningBoards = boards.filter((board) => board.bingo);

    if (winningBoards.length > 0) {
      winners = winners.concat(
        winningBoards.map((board) => ({
          finalBoard: board,
          winningRound: input[round],
        }))
      );

      boards = boards.filter((board) => !board.bingo);
    }
  }
  const worstBoard = winners[winners.length - 1];
  const score =
    worstBoard.finalBoard.points
      .filter((point) => !point.called)
      .reduce((prev: number, next: Point) => prev + next.value, 0) *
    worstBoard.winningRound;

  return score;
}

console.log("Part 2 test");
console.log("---------------------------");
console.log("Expect ");
console.log(Part2(test));
console.log("===========================");

console.log("Part 2 Answer");
console.log("---------------------------");
console.log(Part2(file));
console.log("===========================");
