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

function removeRolls() {
    const removeableRolls = grid.flatMap((columns, row) => {
        return columns
            .map((value, column) => ({
                row,
                column,
                value
            }))
            .filter((roll) => roll.value === '@')
            .filter((roll) => getAdjancentRollCount(roll.row, roll.column) < 4);
    });

    removeableRolls.forEach((roll) => grid[roll.row][roll.column] = '.');

    return removeableRolls.length;
}

let totalRemoves = 0;
let removedRolls = 0;
do {
    removedRolls = removeRolls();
    totalRemoves += removedRolls;
} while(removedRolls > 0);

console.log(totalRemoves);
