import fs from 'fs'
import path from 'path'
const inputs = fs.readFileSync(path.resolve(__dirname + '/inputs/3.txt'), 'utf-8').split('\n').map(row => row.split(''))

const adjacent = [
    [-1, -1], // L top
    [0, -1], // top
    [1, -1], // R top
    [-1, 0], // L
    [1, 0], // R
    [-1, 1], // L Bott
    [0, 1], // Bott
    [1, 1], // R Bott    
]

const star1 = () => {
    let number = ''
    let total = 0
    for(let y = 0; y < inputs.length; y++) {
        for(let x = 0; x < inputs[y].length; x++) {
            const current = inputs[y][x];
            const addPart = () => {
                let isPart = false
    
                for(let start = x - number.length; start < x; start++) {
                    const match = adjacent.some(([ax, ay]) => {
                        const char = inputs[y + ay]?.[start + ax];
                        if(char) {
                            return !char.match(/\d|[.]/)
                        }
                        return false
                    });
    
                    if(match) {
                        isPart = match
                    }
    
                }
                if(isPart) {
                    total = total + +number;
                }
                number = '';
            }
            if(current.match(/\d/i)) {
                number = number + current;
                
            } else if(inputs[y][x-1]?.match(/\d/i)) {
                addPart()
    
            }
            if(current.match(/\d/i) && x === inputs[y].length - 1) {
                addPart()
            }
        }
    
    }
    console.log(total)
}

star1()
