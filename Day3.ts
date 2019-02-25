import * as fs from 'fs';

class Solution {
    private arr: number[][];
    private size = 1000;
    private rectangles: Rectangle[];

    constructor(private lines: string[]) {
        this.rectangles = this.lines.map(x => this.parse(x));
    }

    private contains(x: number, y: number, rectangle: Rectangle): boolean {
        const point = rectangle.point;

        if (x < point.x) {
            return false;
        }

        if (y < point.y) {
            return false;
        }

        if (x > point.x + rectangle.width - 1) {
            return false;
        }

        if (y > point.y + rectangle.height - 1) {
            return false;
        }

        return true;
    }

    private noOverlap(rectangle: Rectangle, arr: number[][]) {
        let point = rectangle.point;
        for (let column = point.y; column < point.y + rectangle.height; column++) {
            for (let row = point.x; row < point.x + rectangle.width; row++) {
                if (arr[row][column] !== 1) {
                    return false;
                }
            }
        }
        return true;
    }

    private parse(input: string): Rectangle {
        const parts = input.split(/[\s:#]+/).filter(x => x.length != 0);
        const coord = parts[2].split(',');
        const point: Point = { x: +coord[0], y: +coord[1] };
        const size = parts[3].split('x');

        return {
            id: +parts[0],
            point: point,
            width: +size[0],
            height: +size[1]
        };
    }

    part1(): number {
        this.arr = [];
        for (let row = 0; row < this.size; row++) {
            this.arr[row] = [];
        }

        for (let row = 0; row < this.size; row++) {
            for (let column = 0; column < this.size; column++) {
                for (let rectangle of this.rectangles) {
                    const contains = this.contains(row, column, rectangle);
                    if (contains) {
                        if (this.arr[row][column]) {
                            this.arr[row][column]++;
                        }
                        else {
                            this.arr[row][column] = 1;
                        }
                    }
                }
            }
        }

        let result = 0;
        for (let row = 0; row < this.size; row++) {
            for (let column = 0; column < this.size; column++) {
                if (this.arr[row][column] > 1) {
                    result++;
                }
            }
        }

        return result;
    }

    part2(): number {
        for (let rectangle of this.rectangles) {
            if (this.noOverlap(rectangle, this.arr)) {
                return rectangle.id;
            }
        }
    }
}

class Rectangle {
    id: number;
    point: Point;
    width: number;
    height: number;
}

class Point {
    x: number;
    y: number;
}

const sln = new Solution(fs.readFileSync('./Day3.txt').toString().split("\n"));
console.log(sln.part1());
console.log(sln.part2());

