import { readFile } from '../shared/index.js';

const input = readFile('input.txt');

let beams = new Array(input[0].length).fill(0);
beams[input[0].indexOf('S')] = 1;

input.slice(1).forEach((lineString) => {
    const line = lineString.split('');

    beams.forEach((beam, i) => {
        if (beam === 0) {
            return;
        }

        if (line[i] === '^') {
            beams[i - 1] += beam;
            beams[i + 1] += beam;
            beams[i] = 0;
        }
    });
});

console.log(beams.reduce((acc, beam) => acc + (beam || 0)));
