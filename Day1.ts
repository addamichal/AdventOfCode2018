import * as fs from 'fs';

class Solution {
    part1(numbers: string[]): number {
        let result = 0;
        for (let i in numbers) {
            result += +numbers[i];
        }

        return result;
    }

    part2(numbers: string[]) : number {
        let runId = 0;
        let existingResults = new Set<number>();
        let result = 0;

        while(true) {
            for (let i in numbers) {
                result += +numbers[i];

                if (existingResults.has(result)) {
                    console.log("runId", runId);
                    console.log("collection size", existingResults.size);
                    return result;
                }

                existingResults.add(result);
            }
            runId++;
        }
    }
}

var numbers = fs.readFileSync('./Day1.txt').toString().split("\n");

var solution = new Solution();
const part1 = solution.part1(numbers);
console.log(part1);

const part2 = solution.part2(numbers);
console.log(part2);

