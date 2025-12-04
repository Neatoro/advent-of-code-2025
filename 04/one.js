import { readFile } from '../shared/index.js';

const grid = readFile('input.txt')
    .map((row) => row.split(''));

function getAdjancentRollCount(row, column) {
    let count = 0;

    for (let y = -1; y <= 1; ++y) {
        for (let x = -1; x <= 1; ++x) {
            if ((x !== 0 || y !== 0) && grid[row + y]?.[column + x] === '@') {
                ++count;
            }
        }
    }

    return count;
}

const result = grid.reduce(
    (acc, columns, row) => {
        const removableRolls = columns
            .map((value, column) => ({
                row,
                column,
                value
            }))
            .filter((element) => element.value === '@')
            .filter((element) => getAdjancentRollCount(element.row, element.column) < 4);

        return acc + removableRolls.length;
    },
    0
);

console.log(result);
