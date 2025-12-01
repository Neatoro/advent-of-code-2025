import { readFile } from '../shared/index.js';

const content = readFile('input.txt');

const regex = /(L|R)([0-9]+)/;

function parseElement(element) {
    const result = regex.exec(element);

    return {
        direction: result[1],
        count: Number(result[2]) % 100
    };
}

let pointing = 50;

const result = content
    .map((element) => parseElement(element))
    .map((element) => {
        const factor = element.direction === 'L' ? -1 : 1;
        pointing = pointing + (factor * element.count);

        if (pointing > 99) {
            pointing = pointing - 100;
        } else if (pointing < 0) {
            pointing = pointing + 100;
        }

        return pointing;
    })
    .filter((step) => step === 0)
    .length;

console.log(result)
