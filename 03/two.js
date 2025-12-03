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
        let sum = 0;
        for (let i = 12; i > 0; --i) {
            sum *= 10;
            if (i === bank.length) {
                sum *= Math.pow(10, bank.length - 1);
                sum += Number(bank);
                break;
            }

            const highestAvailable = findHighestNumber(bank.substring(0, bank.length - i + 1));
            sum += highestAvailable.number;
            bank = bank.substring(highestAvailable.index + 1);

        }
        return sum;
    })
    .reduce((acc, cur) => acc + cur, 0);

console.log(result)
