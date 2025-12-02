import { readFile } from '../shared/index.js';

const content = readFile('input.txt');
const idRanges = content[0]
    .split(',')
    .map((range) => {
        const split = range.split('-');
        return {
            start: split[0],
            end: split[1]
        };
    });

const result = idRanges
    .flatMap((range) => {
        let currentNumber = range.start;
        const numbers = [];
        do {
            if (currentNumber.length % 2 === 1) {
                currentNumber = String(Math.pow(10, currentNumber.length));
                continue;
            }

            const firstHalf = currentNumber.substring(0, currentNumber.length / 2);
            currentNumber = firstHalf + firstHalf;

            if (Number(currentNumber) <= Number(range.end) && Number(currentNumber) >= Number(range.start)) {
                numbers.push(Number(currentNumber));
            }

            const newFirstHalf = String(Number(firstHalf) + 1);
            currentNumber = newFirstHalf + newFirstHalf;
        } while(Number(currentNumber) <= Number(range.end));

        return numbers;
    })
    .reduce((acc, cur) => acc + cur, 0);

console.log(result);
