import fs from 'fs'
import path from 'path'
const input = fs.readFileSync(path.resolve(__dirname + '/inputs/6.txt'), 'utf-8')

for(let i = 0; i < input.length; i++) {
    const set = new Set(input.slice(i, i + 14))

    if(set.size === 14) {
        console.log(i + 14) 
        break;
    };
}
