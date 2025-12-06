import { readFileSync } from 'fs';

export function readFile(filePath, notrim = false) {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.trim().split('\n');
    if (notrim) {
        return lines;
    }
    return lines.map((line) => line.trim());
}
