import { readFile } from '../shared/index.js';

const input = readFile('input.txt');

let beams = [input[0].indexOf('S')];
const result = input.slice(1).reduce((acc, lineString) => {
    const line = lineString.split('');
    let split = 0;
    beams = beams.flatMap((beam) => {
        switch (line[beam]) {
            case '.':
                line[beam] = '|';
                return [beam];
            case '^':
                line[beam - 1] = '|';
                line[beam + 1] = '|';
                ++split;
                return [beam - 1, beam + 1];
        }
    });

    return acc + split;
}, 0);

console.log(result);
