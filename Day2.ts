import * as fs from 'fs';

class Solution {
    part1(lines: string[]): number {
        let twoTimes = 0;
        let threeTimes = 0;

        for (const line of lines) {
            if (this.sameCharacter(line, 3)) {
                threeTimes++;
            }
            if (this.sameCharacter(line, 2)) {
                twoTimes++;
            }
        }
        return twoTimes * threeTimes;
    }

    part2(lines: string[]): string {
        for (let i = 0; i < lines.length; i++) {
            for (let j = i + 1; j < lines.length; j++) {
                const areSimilar = this.areSimilar(lines[i], lines[j]);
                if (areSimilar) {
                    return this.sameCharacters(lines[i], lines[j]);
                }
            }
        }
        return null;
    }

    areSimilar(line1: string, line2: string) {
        let numOfDifferences = 0;
        for (let i = 0; i < line1.length; i++) {
            if (line1[i] !== line2[i]) {
                numOfDifferences++;
            }
            if (numOfDifferences > 1) {
                return false;
            }
        }
        return numOfDifferences === 1;
    }

    sameCharacters(line1: string, line2: string) {
        let result = '';
        for (let i = 0; i < line1.length; i++) {
            if (line1[i] === line2[i]) {
                result += line1[i];
            }
        }
        return result;
    }

    sameCharacter(line: string, times: number) {
        const arr = {};
        for (const c of line) {
            if (arr[c]) {
                arr[c]++;
            } else {
                arr[c] = 1;
            }
        }
        for (let c in arr) {
            if (arr[c] === times) {
                return true;
            }
        }
        return false;
    }
}

var lines = fs.readFileSync('./Day2.txt').toString().split("\n");
let solution = new Solution();
const part1 = solution.part1(lines);

console.log(part1);
const part2 = solution.part2(lines);
console.log(part2);


