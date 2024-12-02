import { readFile } from "fs/promises";

// Part 1

const input = await readFile(__dirname + "/input.txt", "utf8");
const matrix = input.split(/\r?\n/).map((line) => line.split(/ +/).map(Number));

let left = matrix.map(([l, _]) => l).sort((a, b) => a - b);
let right = matrix.map(([_, r]) => r).sort((a, b) => a - b);

const distances: number[] = left.map((_, i) => Math.abs(left[i] - right[i]));
const totalDistance = distances.reduce((acc, curr) => acc + curr, 0);

console.log("Total distance: " + totalDistance + " !!!");

// Part 2

const similarity = left.reduce(
    (acc, curr) =>
        acc + curr * right.filter((rightN) => rightN === curr).length,
    0,
);

console.log("Similarity score: " + similarity);
