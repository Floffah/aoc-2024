import { readFile } from "fs/promises";

// Part 1

const input = await readFile(__dirname + "/input.txt", "utf8");
const matrix = input.split(/\r?\n/).map((line) => line.split(/ +/).map(Number));

function isSafe(numbers: number[]): boolean {
    const increasing = numbers[0] < numbers[1];
    const pairs = numbers
        .slice(0, -1)
        .map((_, i) => [numbers[i], numbers[i + 1]]);

    return pairs.every(([a, b]) => {
        const diff = Math.abs(a - b);

        return (
            ((increasing && a < b) || (!increasing && a > b)) &&
            diff >= 1 &&
            diff <= 3
        );
    });
}

// Part 1
const exactSafe = matrix.filter(isSafe).length;

console.log("(Exact) Safe levels:", exactSafe);

// Part 2
const dampenedSafe = matrix.filter((nums) => {
    for (let i = 0; i < nums.length; i++) {
        const numsWithRemoved = nums.slice(0, i).concat(nums.slice(i + 1));

        if (isSafe(numsWithRemoved)) return true;
    }
}).length;

console.log("(Dampened) Safe levels:", dampenedSafe);
