import fs from 'fs'
import path from 'path'
const inputs = fs.readFileSync(path.resolve(__dirname + '/inputs/2.txt'), 'utf-8').split('\n')

const star1 = () => {
    const max = {
        red: 12,
        green: 13,
        blue: 14
    }
    let total = 0;
    const isPossible = (draw: string[]) => {
        const isInPossible = draw.some((balls) => {
            const [number, color] = balls.trim().split(' ') as [number, 'red' | 'green' | 'blue'];
            return max[color] < number

        })

        return !isInPossible
    }
    inputs.forEach((value) => {
        const [game, balls] = value.split(':');
        const draws = balls.split(';').map(draw => draw.trim())
        const isInPossibleGame = draws.some(draw => {
            const balls = draw.split(',')
            return !isPossible(balls)
        })
        const [,gameNr] = game.trim().split(' ')
        if(!isInPossibleGame) {
            total = total + +gameNr;
        }
    })

    return total;

}

console.log(star1())

const star2 = () => {
    let total = 0;
    inputs.forEach((value) => {
        const maxColor = {
            red: 0,
            blue: 0,
            green: 0
        }
        const [game, balls] = value.split(':');
        const draws = balls.split(';').map(draw => draw.trim())
        draws.forEach(draw => {
            draw.split(',').forEach(value => {
                const [number, color] = value.trim().split(' ') as [string, 'red' | 'green' | 'blue'];
                if(maxColor[color] < +number) {
                    maxColor[color] = +number
                }
            })
            
        })
        total = total + (maxColor['red'] * maxColor['blue'] * maxColor['green'])
    })

    return total;

}

console.log(star2())