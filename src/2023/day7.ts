import fs from 'fs'
import path from 'path'
const inputs = fs.readFileSync(path.resolve(__dirname + '/inputs/7.txt'), 'utf-8').split('\n').map(input => input.split(' ')).filter(([hand]) => hand)

const star1 = () => {

    const getValue = (handvalue: number[]) => {
        if(handvalue.includes(5)) return 7;
        if(handvalue.includes(4)) return 6;
        if(handvalue.includes(3) && handvalue.includes(2)) return 5;
        if(handvalue.includes(3)) return 4;
        if(handvalue.filter(v => v === 2).length === 2) return 3;
        if(handvalue.includes(2)) return 2;
        return 1
    }
    
    const getCardValue = (card: string|number) => {
        if(card === 'A') return 14;
        if(card === 'K') return 13;
        if(card === 'Q') return 12;
        if(card === 'J') return 11;
        if(card === 'T') return 10;
        return +card
    }
    
    const gethighestHand = (hand1: string, hand2: string) => {
        for(let i = 0; i < hand1.length; i++ ){
            const AValue = getCardValue(hand1[i]) 
            const BValue = getCardValue(hand2[i]) 
            if(AValue !== BValue) {
                if(AValue < BValue) return -1 
                if(AValue > BValue) return 1 
            }
        }
        return 0;
    }
    const getHand = (hand: string) => {
        const kinds = hand.split('').reduce<Record<string, number>>((acc, curr) => {
            if(!acc[curr]) {
                acc[curr] = 1; 
                return acc;
            }
            acc[curr] = acc[curr] + 1; 
            
            return acc;
        },{})
        return Object.values(kinds)
    }
    inputs.sort(([hand], [handB]) => {
        const a = getValue(getHand(hand))
        const b = getValue(getHand(handB))
        if(a < b) return -1;
        if(a > b ) return 1;
        return gethighestHand(hand, handB)
    })
    
    const total = inputs.reduce((acc, [hand, bet], i) => {
        return acc + (+bet * (i + 1))
    },0)
    
    console.log(total)
}

const star2 = () => {

    const getValue = (handvalue: number[]) => {
        if(handvalue.includes(5)) return 7;
        if(handvalue.includes(4)) return 6;
        if(handvalue.includes(3) && handvalue.includes(2)) return 5;
        if(handvalue.includes(3)) return 4;
        if(handvalue.filter(v => v === 2).length === 2) return 3;
        if(handvalue.includes(2)) return 2;
        return 1
    }
    
    const getCardValue = (card: string|number) => {
        if(card === 'A') return 14;
        if(card === 'K') return 13;
        if(card === 'Q') return 12;
        if(card === 'J') return 1;
        if(card === 'T') return 10;
        return +card
    }
    
    const gethighestHand = (hand1: string, hand2: string) => {
        for(let i = 0; i < hand1.length; i++ ){
            const AValue = getCardValue(hand1[i]) 
            const BValue = getCardValue(hand2[i]) 
            if(AValue !== BValue) {
                if(AValue < BValue) return -1 
                if(AValue > BValue) return 1 
            }
        }
        return 0;
    }

    const upgradeHand = (hand: number[], Js: number) => {
        if(hand.some(v => v + Js === 5)) {
            return [5];
        }
        if(hand.some(v => v + Js === 4)) {
            return [4];
        }
        if(hand.filter(v => v === 2).length === 2) {
            return [3, 2]
        }
        if(hand.includes(2)) {
            return [2 + Js];
        }
        return [1 + Js]
    }

    const getHand = (hand: string) => {
        const Js = hand.split('').filter(H => H === 'J');
        const kinds = hand.split('').filter(H => H !== 'J').reduce<Record<string, number>>((acc, curr) => {
            if(!acc[curr]) {
                acc[curr] = 1; 
                return acc;
            }
            acc[curr] = acc[curr] + 1; 
            
            return acc;
        },{})

        if(Js.length === 5) {
            return [5];
        }

        if(Js.length) {
            return upgradeHand(Object.values(kinds), Js.length)
        }
        return Object.values(kinds)
    }
    inputs.sort(([hand], [handB]) => {
        const a = getValue(getHand(hand))
        const b = getValue(getHand(handB))
        if(a < b) return -1;
        if(a > b ) return 1;
        return gethighestHand(hand, handB)
    })
    
    const total = inputs.reduce((acc, [hand, bet], i) => {
        return acc + (+bet * (i + 1))
    },0)
    
    console.log(total)
}

star2()
star1()
