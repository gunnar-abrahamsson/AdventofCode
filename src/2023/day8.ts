import fs from "fs";
import path from "path";
const [instructionText, inputsText] = fs
	.readFileSync(path.resolve(__dirname + "/inputs/8.txt"), "utf-8")
	.split("\n\n");


const star1 = () => {
    const RLArray = instructionText.split("").map(value => {
        switch(value) {
            case "L": {
                return 0
            }
            case "R": {
                return 1
            }
            default: throw new Error('AJ AJ')
        }
    });
    const instructions = new Map<number, { value: number; next: () => unknown }>();
    const getNext = (i: number) => {
        return instructions.get(i);
    };
    for (let i = 0; i < RLArray.length; i++) {
        if (i === RLArray.length - 1) {
            instructions.set(i, { value: RLArray[i], next: () => getNext(0) });
        } else {
            instructions.set(i, { value: RLArray[i], next: () => getNext(i + 1) });
        }
    }
    
    
    const buildMaze = () => {
        const maze: Record<string, [string, string]> = {};	
        const inputs2 = inputsText.split("\n")
        inputs2.forEach(row => {
            const [key, value] = row.split('=')
            const [left, right] = value.split(',')
            maze[key.trim()] = [left.replace('(', '').replace(' ', ''), right.replace(')', '').replace(' ', '')]
        })
    
        return maze
    };
    
    const maze = buildMaze();
    
    
    let length =0;
    let current = "AAA";
    let nextInstruction = instructions.get(0) as any;
    
    while (current !== "ZZZ") {
        length++;
        current = maze[current][nextInstruction.value]
        nextInstruction = nextInstruction.next();
    }

    return length;
}
console.log(star1())

