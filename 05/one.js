import { readFile } from '../shared/index.js';

const input = readFile('input.txt');

const { freshRanges, availableIngredients } = input.reduce(
    (acc, line) => {
        if (line === '') {
            acc.line = true;
            return acc;
        }

        if (acc.line) {
            acc.availableIngredients.push(Number(line));
        } else {
            const split = line.split('-');
            acc.freshRanges.push({
                start: Number(split[0]),
                end: Number(split[1])
            });
        }

        return acc;
    },
    { freshRanges: [], availableIngredients: [], line: false }
);

function isFresh(ingredient) {
    const validRanges = freshRanges.filter((range) => range.start <= ingredient && range.end >= ingredient);
    return validRanges.length > 0;
}

const freshIngredients = availableIngredients.filter(isFresh);

console.log(freshIngredients.length);
