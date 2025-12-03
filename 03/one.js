import { readFile } from '../shared/index.js';

const banks = readFile('input.txt');

function findHighestNumber(bank) {
    let index = -1;
    for (let i = 9; i > 0; --i) {
        index = bank.indexOf(String(i));
        if (index !== -1) {
            break;
        }
    }

    return {
        index,
        number: Number(bank[index])
    };
}

const result = banks
    .map((bank) => {
        const firstNumber = findHighestNumber(bank.slice(0, -1));
        const secondNumber = findHighestNumber(bank.substring(firstNumber.index + 1));

        return firstNumber.number * 10 + secondNumber.number;
    })
    .reduce((acc, cur) => acc + cur, 0);

console.log(result)
