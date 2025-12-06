import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .slice(0, -1)
    .reduceRight(
        (acc, line, index, lines) => {
            if (index === lines.length - 1) {
                return [...line.matchAll(/[\*\+]\s*/g)]
                    .map((match, index, matches) => ({
                        numbers: [],
                        operator: match[0].trim(),
                        start: match.index,
                        end: index === matches.length - 1 ? undefined : match.index + match[0].length - 1
                    }));
            }

            acc.forEach((operation) => {
                const number = line.substring(operation.start, operation.end);
                operation.numbers.push(number);
            });

            return acc;
        },
        []
    )
    .map((operation) => {
        const numbers = operation.numbers
            .reduce(
                (acc, number) => {
                    const digits = number.split('');
                    digits.forEach((digit, index) => {
                        if (!acc[index]) acc[index] = [];
                        acc[index].unshift(digit);
                    });

                    return acc;
                },
                []
            );

        return {
            ...operation,
            numbers: numbers.map((number) => Number(number.join('').trim()))
        };
    });

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
