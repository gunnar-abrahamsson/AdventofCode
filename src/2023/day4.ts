import fs from 'fs'
import path from 'path'
const inputs = fs.readFileSync(path.resolve(__dirname + '/inputs/4.txt'), 'utf-8').split('\n').map(row => row.split(''))

// console.log(inputs)

let score = 0;
inputs.forEach((card) => {
    const [winning, my] = card.join('').split('|')
    const [, winningCard] = winning.split(':');

    const myNumbers = my.trim().split(' ').filter(v => v !== '')
    const winningNumbers = winningCard.trim().split(' ').filter(v => v !== '')

    const myWinningNumbers = myNumbers.filter(myNumber => winningNumbers.includes(myNumber))
    let cardScore = 0;

    myWinningNumbers.forEach((win, index ) => {
        if(index === 0) {
            cardScore = 1
        } else {
            cardScore = cardScore * 2
        }
    })

    score = score + cardScore;
}) 

console.log(score)