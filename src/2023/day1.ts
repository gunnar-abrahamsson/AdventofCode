import fs from "fs";
import path from "path";
const inputs = fs
	.readFileSync(path.resolve(__dirname + "/inputs/1.txt"), "utf-8")
	.split("\n");

const getValue = (input: string) => {
	const array = input.split("");
	const first = array.findIndex((value) => +value);
	const last = array.findLastIndex((value) => +value);

	return +(array[first] + array[last]);
};
console.log(
	inputs.reduce((acc, curr) => {
		return acc + getValue(curr);
	}, 0)
);

const numbers = [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];
const getValue2 = (input: string) => {
    let string = ""
    const foundNumbers: number[] = [];
    for(let i = 0; i < input.length; i++) {
        if(+input[i]) {
            foundNumbers.push(+input[i])
            string = ""
            continue;
        }
        string = string + input[i];
        const foundNumber = numbers.find((num) => string.match(RegExp(`${num}`)))
        
        if(foundNumber) {
            foundNumbers.push(numbers.indexOf(foundNumber) + 1)
            string = "";
            i = i - foundNumber.length + 1
        }
    }
	const first = foundNumbers[0];
	const last = foundNumbers[foundNumbers.length - 1];
    return +`${first}${last}`
};



console.log(
	inputs.reduce((acc, curr) => {
		return acc + getValue2(curr);
	}, 0)
);
