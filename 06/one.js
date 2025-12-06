import { readFile } from '../shared/index.js';

const input = readFile('input.txt')
    .reduce(
        (acc, line, index, lines) => {
            const split = line.split(/\s+/);
            split.forEach((element, i) => {
                if (!acc[i]) {
                    acc[i] = { numbers: [], operator: '' };
                }

                if (index === lines.length - 1) {
                    acc[i].operator = element;
                } else {
                    acc[i].numbers.push(Number(element));
                }
            });
            return acc;
        },
        []
    );

const result = input
    .map((operation) => {
        return operation.numbers
            .reduce(
                (acc, cur) => {
                    if (acc === null) {
                        return cur;
                    }

                    if (operation.operator === '+') {
                        return acc + cur;
                    } else {
                        return acc * cur;
                    }
                },
                null
            )
    })
    .reduce((acc, cur) => acc + cur, 0);

console.log(result);
