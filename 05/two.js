import { readFile } from '../shared/index.js';

const input = readFile('input.txt');
const emptyLineIndex = input.findIndex((line) => line === '');
const rangeLines = input.slice(0, emptyLineIndex);

const freshRanges = rangeLines.map(
    (line) => {
        const split = line.split('-');
        return {
            start: Number(split[0]),
            end: Number(split[1])
        };
    }
);

function mergeRanges(ranges) {
    const mergedRanges = [];
    ranges.forEach((range) => {
        if (mergedRanges.length === 0) {
            mergedRanges.push(range);
        }

        const mergeableRangeIndex = mergedRanges.findIndex(
            (r) => (range.start >= r.start && range.start <= r.end)
                || (range.end >= r.start && range.end <= r.end)
                || (r.start >= range.start && r.start <= range.end)
                || (r.end >= range.start && r.end <= range.end)
        );

        if (mergeableRangeIndex === -1) {
            mergedRanges.push(range);
        } else {
            const mergeableRange = mergedRanges[mergeableRangeIndex];
            const mergedRange = { start: Math.min(range.start, mergeableRange.start), end: Math.max(range.end, mergeableRange.end) };
            mergedRanges[mergeableRangeIndex] = mergedRange;
        }
    });
    return mergedRanges;
}

let lastRanges = freshRanges;
let mergedRanges = freshRanges;
do {
    lastRanges = mergedRanges;
    mergedRanges = mergeRanges(lastRanges);
} while(lastRanges.length !== mergedRanges.length);

const freshIdsCount = mergedRanges.reduce((acc, range) => acc + (range.end - range.start) + 1, 0);

console.log(freshIdsCount);
