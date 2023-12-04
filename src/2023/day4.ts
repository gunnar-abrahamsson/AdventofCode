import fs from 'fs'
import path from 'path'
const inputs = fs.readFileSync(path.resolve(__dirname + '/inputs/4.txt'), 'utf-8').split('\n').map(row => row.split(''))

const star1 = () => {

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
}
star1();


const star2 = () => {
    const cards: Record<number, number> = {}
    inputs.map((_v,i) => i).forEach(v => cards[v] = 1)
    Object.entries(cards).forEach(([key, value]) => {
        const [winning, my] = inputs[+key].join('').split('|')
        
        const [, winningCard] = winning.split(':');
        
        const myNumbers = my.trim().split(' ').filter(v => v !== '')
        const winningNumbers = winningCard.trim().split(' ').filter(v => v !== '')
        const myWinningNumbers = myNumbers.filter(myNumber => winningNumbers.includes(myNumber))

        myWinningNumbers.forEach((_n, i) => {
            cards[+key + i + 1] = cards[+key + i + 1] + 1 * cards[+key]
        })
    })

    const total = Object.values(cards).reduce((acc, curr) => acc + curr, 0)
    console.log(total)
}

star2()