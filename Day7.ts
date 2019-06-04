import * as fs from 'fs';
import * as _ from 'lodash';

class Solution {
    private graph = {};
    private directions: Direction[];

    constructor(private lines: string[]) {
        this.directions = this.lines.map(x => this.parse(x));
    }

    private parse(line: string): Direction {
        let re = /Step (?<from>[a-zA-Z]+) must be finished before step (?<to>[a-zA-Z]+) can begin./
        let result = <any>line.match(re);
        return result.groups;
    }

    answer1() {
        for (const direction of this.directions) {
            let nodeFrom = this.graph[direction.from];
            if (nodeFrom === undefined) {
                nodeFrom = <Node>{
                    value: direction.from,
                    children: [],
                    parents: []
                }
                this.graph[direction.from] = nodeFrom;
            }

            let nodeTo = this.graph[direction.to];
            if (nodeTo === undefined) {
                nodeTo = <Node>{
                    value: direction.to,
                    children: [],
                    parents: []
                }
                this.graph[direction.to] = nodeTo;
            }

            nodeTo.parents.push(nodeFrom);
            nodeFrom.children.push(nodeTo);
        }

        const root = this.getRoot();
        root.level = 0;

        let result = '';
        let stack: Node[] = [];
        stack.push(root);
        while (stack.length != 0) {
            const el = _.sortBy(stack.filter(a => a.parents.every(a => a.visited)), ['value'])[0];
            stack.splice(stack.indexOf(el), 1);
            for (const child of el.children) {
                child.level = el.level + 1;

                if(!stack.filter(x => x.value === child.value)[0]) {
                    stack.push(child);
                }
            }
            el.visited = true;
            result += el.value;
        }

        return result;
    }

    getRoot(): Node {
        for (const nodeIndex in this.graph) {
            if (!this.graph[nodeIndex].parent) return this.graph[nodeIndex];
        }
        return null;
    }

}

class Direction {
    from: string;
    to: string;
}

class Node {
    parents: Node[];
    value: string;
    children: Node[];
    level: number;
    visited: boolean;
}

const lines = fs.readFileSync('./Day7.txt').toString().split("\n");
const sln = new Solution(lines);
const result = sln.answer1();
console.log(result);
