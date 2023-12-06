import fs from 'fs'
import path from 'path'
const inputs = fs.readFileSync(path.resolve(__dirname + '/inputs/6.txt'), 'utf-8').split('\n')

const star1 = () => {
    const times = inputs[0].split(' ').filter(input => +input)
    const distances = inputs[1].split(' ').filter(input => +input)
    
    let results: number[] = [];
    
    for(let i = 0; i < times.length; i++) {
        let totalTime = +times[i];
        const record = +distances[i];
        let wins = 0
        for(let hold = 1; hold < totalTime; hold++) {
            const remaining = totalTime - hold;
            if(remaining * hold > record) {
                wins++
            }
        }
        results.push(wins)
    }
    
    console.log(results.reduce((acc, curr) => acc * curr, 1))

}
star1();

const start2 = () => {
    const times = inputs[0].split(' ').filter(input => +input).join('')
    const distances = inputs[1].split(' ').filter(input => +input).join('')
    
    let totalTime = +times;
    const record = +distances;
    let wins = 0

    for(let hold = 1; hold < totalTime; hold++) {
        const remaining = totalTime - hold;
        if(remaining * hold > record) {
            wins++
        }
    }
    
    console.log(wins)

}
start2();