const textPairs = (await Deno.readTextFile('./inputs/13.txt')).split('\n\n');

type Signal = (number | number[])[] | Signal[];
type Pairs = [Signal, Signal][];
const pairs = textPairs.map(pair => pair.split('\n').map(p => JSON.parse(p))) as Pairs;




const isRightOrder = (left: Signal, right: Signal): boolean => {
    // If both values are integers, the lower integer should come first. If the left integer is lower than the right integer, the inputs are in the right order. If the left integer is higher than the right integer, the inputs are not in the right order. Otherwise, the inputs are the same integer; continue checking the next part of the input.

    if(typeof left === 'number' && typeof right === 'number') {
        return left <= right;
    }

    if(left instanceof Array) {
        left.forEach(leftValue => {

        })
    }
    // If both values are lists, compare the first value of each list, then the second value, and so on. If the left list runs out of items first, the inputs are in the right order. If the right list runs out of items first, the inputs are not in the right order. If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.
    
    // If exactly one value is an integer, convert the integer to a list which contains that integer as its only value, then retry the comparison. For example, if comparing [0,0,0] and 2, convert the right value to [2] (a list containing 2); the result is then found by instead comparing [0,0,0] and [2].
    if(typeof left !== typeof right) {
        const newLeft = left instanceof Array ? [left] : left;
        const newRight = right instanceof Array ? [right] : right;
        return isRightOrder(newLeft, newRight);
    }
    return false;
}

const pairsInRightOrder: number[] = []

for(let i = 1; i <= pairs.length; i++) {
    console.log(pairs[i - 1])
    if(isRightOrder(pairs[i - 1][0], pairs[i - 1][1])) {
        pairsInRightOrder.push(i);
    };
}



console.log('[1,1,3,1,1] vs [1,1,5,1,1] expect true', isRightOrder([1,1,3,1,1], [1,1,5,1,1]))
console.log('[[1],[2,3,4]] vs [[1],4] expect true', isRightOrder([[1],[2,3,4]], [[1],4]) )
console.log('[9] vs [[8,7,6]] expect false', isRightOrder([9], [[8,7,6]]) )