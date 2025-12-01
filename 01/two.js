import { readFile } from '../shared/index.js';

const content = readFile('input.txt');

const regex = /(L|R)([0-9]+)/;

function parseElement(element) {
    const result = regex.exec(element);

    return {
        direction: result[1],
        count: Number(result[2])
    };
}

let pointing = 50;

const result = content
    .map((element) => parseElement(element))
    .map((element) => {
        const factor = element.direction === 'L' ? -1 : 1;
        const newPointing = pointing + (factor * (element.count % 100));

        let clicks = (element.count - (element.count % 100)) / 100;
        if (pointing != 0 && (newPointing > 99 || newPointing <= 0)) {
            ++clicks;
        }

        pointing = newPointing;
        if (pointing > 99) {
            pointing = pointing - 100;
        } else if (pointing < 0) {
            pointing = pointing + 100;
        }

        return clicks;
    })
    .reduce((acc, step) => acc + step, 0);

console.log(result)
