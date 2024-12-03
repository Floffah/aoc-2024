import { readdir } from "fs/promises";
import chalk from "chalk";
import parse from "color-parse";

const inputDay = process.argv[2];

let days = [];

if (inputDay) {
    days.push(inputDay);
} else {
    const dayDir = await readdir(__dirname + "/days").then((day) =>
        day.filter((dir) => dir.match(/^\d+$/)),
    );

    for (const dir of dayDir) {
        days.push(dir);
    }
}

days = days.sort((a, b) => parseInt(a) - parseInt(b));

const gradientFrom = "#fca5a5";
const gradientTo = "#86efac";

const getColor = (percentage: number) => {
    const colorFrom = parse(gradientFrom);
    const colorTo = parse(gradientTo);

    const r = Math.floor(
        colorFrom.values[0] +
            (colorTo.values[0] - colorFrom.values[0]) * percentage,
    );
    const g = Math.floor(
        colorFrom.values[1] +
            (colorTo.values[1] - colorFrom.values[1]) * percentage,
    );
    const b = Math.floor(
        colorFrom.values[2] +
            (colorTo.values[2] - colorFrom.values[2]) * percentage,
    );

    return chalk.rgb(r, g, b);
};

for (const day of days) {
    console.log(
        getColor(parseInt(day) / days.length)(" --- Day " + day + " --- "),
    );

    const path = `./days/${day}`;
    const files = await readdir(path);

    for (const file of files) {
        if (file.match(/\.ts$/)) {
            await import(`${path}/${file}`);
        }
    }
}
