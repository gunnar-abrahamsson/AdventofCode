import fs from 'fs'
import path from 'path'
const input = fs.readFileSync(path.resolve(__dirname + '/inputs/5.txt'), 'utf-8')
const [cratesInput, instructionString] = input.split('\n\n');
const cratesStrings = cratesInput.split('\n')
const crateMap = new Map<number, string[]>();

for (let i = 0; i < cratesStrings.length - 1; i++) {
    const crateString = cratesStrings[i];
    for (let createStack = 1; createStack <= 9; createStack++) {
        crateMap.get(createStack) ? null : crateMap.set(createStack, [])
        const cratePosition = createStack === 1 ? createStack : (1 + 4 * (createStack - 1))
        
        const crate = crateString[cratePosition];
        if(crate?.replace(' ', '')) {
            const copy = crateMap.get(+createStack);
            copy && crateMap.set(createStack, [...copy, crate])
        }
    }
}

const matching = instructionString.split('\n').map(i => i.match(/\d+/g));
const instructions = matching.flatMap(match => match ? [match] : []);
instructions.forEach(instruction => {
    const [ammount, from, to] = instruction;

        const fromStack = crateMap.get(+from)
        const toStack = crateMap.get(+to);
        if(!fromStack || !toStack) return;

        const movedCrate = fromStack.slice(0, +ammount);
        fromStack.splice(0, +ammount);
        movedCrate && crateMap.set(+to, [...movedCrate, ...toStack])
        crateMap.set(+from, [...fromStack])
})

let answer = '';

crateMap.forEach(value => {
    if(value[0]) answer = answer + value[0]
})
console.log(answer)

