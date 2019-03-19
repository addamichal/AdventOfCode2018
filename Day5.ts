import * as fs from 'fs';

class Solution {
    part1(input: string[]) {
        return this.getAnswer(input[0]);
    }

    part2(input: string[]): number {
        let min = Number.MAX_SAFE_INTEGER;
        for(var i = 65; i <= 90; i++) {
            let inputLine = input[0];
            const c = String.fromCharCode(i);
            inputLine = inputLine.split(c).join('');
            inputLine = inputLine.split(c.toLocaleLowerCase()).join('');
            const current = this.getAnswer(inputLine);
            if(current < min) {
                min = current;
            }
        }

        return min;
    }

    getAnswer(inputLine: string): number {
        const pairs = [];
        for (var i = 65; i <= 90; i++) {
            const c = String.fromCharCode(i);
            pairs.push(c + c.toLowerCase());
            pairs.push(c.toLowerCase() + c);
        }

        while (pairs.some(x => inputLine.includes(x))) {
            const occurence = pairs.filter(x => inputLine.includes(x))[0];
            inputLine = inputLine.replace(occurence, '');
        }

        return inputLine.length;
    }
}

var input = fs.readFileSync('./Day5.txt').toString().split("\n");
var solution = new Solution();
const part1 = solution.part1(input);
console.log(part1);
const part2 = solution.part2(input);
console.log(part2);
