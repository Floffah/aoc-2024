import { readFile } from "fs/promises";

// Part 1

const input = await readFile(__dirname + "/input.txt", "utf8");
const lines = input.split(/\r?\n/);

let left: number[] = [];
let right: number[] = [];

for (const line of lines) {
    const [l, r] = line.split(/ +/).map(Number);
    left.push(l);
    right.push(r);
}

left = left.sort((a, b) => a - b);
right = right.sort((a, b) => a - b);

const distances: number[] = [];

for (let i = 0; i < left.length; i++) {
    const min = Math.min(left[i], right[i]);
    const max = Math.max(left[i], right[i]);
    distances.push(max - min);
}

const totalDistance = distances.reduce((acc, curr) => acc + curr, 0);

console.log("Total distance: " + totalDistance + " !!!");

// Part 2

let similarityAccum = 0;

for (const leftN of left) {
    const appearsCount = right.filter((rightN) => rightN === leftN).length;
    similarityAccum += leftN * appearsCount;
}

console.log("Similarity score: " + similarityAccum);
