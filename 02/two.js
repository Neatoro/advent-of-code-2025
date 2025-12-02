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
        const numbers = [];
        for (let i = 2; i <= range.end.length; ++i) {
            let currentNumber = range.start;
            do {
                if (currentNumber.length % i !== 0) {
                    currentNumber = String(Math.pow(10, currentNumber.length));
                    continue;
                }

                const firstPart = currentNumber.substring(0, currentNumber.length / i);
                currentNumber = firstPart.repeat(i);

                if (Number(currentNumber) <= Number(range.end) && Number(currentNumber) >= Number(range.start) && !numbers.includes(Number(currentNumber))) {
                    numbers.push(Number(currentNumber));
                }

                const newFirstPart = String(Number(firstPart) + 1);
                currentNumber = newFirstPart.repeat(i);
            } while(Number(currentNumber) <= Number(range.end));
        }

        return numbers;
    })
    .reduce((acc, cur) => acc + cur, 0);

console.log(result);
