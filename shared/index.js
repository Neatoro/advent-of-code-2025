import { readFileSync } from 'fs';

export function readFile(filePath) {
    const content = readFileSync(filePath, 'utf-8');
    return content.trim().split('\n').map((line) => line.trim());
}
