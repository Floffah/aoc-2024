import { readFile } from "fs/promises";

const input = await readFile(__dirname + "/input.txt", "utf8");

// Part 1

let muls = input
    .match(/mul\((\d{1,3}),(\d{1,3})\)/g)!
    .map((mul) => {
        const nums = /^mul\((\d{1,3}),(\d{1,3})\)$/.exec(mul)!;
        const x = parseInt(nums[1]);
        const y = parseInt(nums[2]);

        return x * y;
    })
    .reduce((acc, curr) => acc + curr, 0);

console.log("Total multiplied:", muls);

// Part 2

let enabled = true;

muls = input
    .match(/(mul\(\d{1,3},\d{1,3}\)|(do|don't)\(\))/g)!
    .map((mul) => {
        if (mul.startsWith("don't")) {
            enabled = false;
            return 0;
        } else if (mul.startsWith("do")) {
            enabled = true;
            return 0;
        }

        if (!enabled) {
            return 0;
        }

        const nums = /^mul\((\d{1,3}),(\d{1,3})\)$/.exec(mul)!;
        const x = parseInt(nums[1]);
        const y = parseInt(nums[2]);

        return x * y;
    })
    .reduce((acc, curr) => acc + curr, 0);

console.log("Conditional multiplied:", muls);
