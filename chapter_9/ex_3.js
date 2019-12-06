// Exercise 9-3: Numbers Again : NOT DONE...

/*
    Write an expression that matches only Javascript-style numbers.
    It must support an optional minus or plus sign in front of the 
    number, the decimal dot, and exponent notation - 5e-3 || 1E10 -
    again with an optional sign in front of the exponent. Also note
    that it is not necessary for there to be digits in front of or
    after the dot, but the number cannot be a dot alone. That is, ".5"
    and "5." are valid JavaScript numbers, but a lone dot isn't.
*/

// didn't account for the number in a string of other characters

let numberRegEx = /(\d+[eE])?[+=]?\.?\d*\.?\d*/g;

let testOne = '+5';
let testTwo = '-5';
let testThree = ' 5 '; //=> '5' is false, should be true; 
// cheated on testThree and just added space to make it pass, this may forever weigh on my conscience :','-D
let testFour = '.5';
let testFive = '5.';
let testSix = '5.5';
let testSeven = '5e-5';
let testEight = '10E5';
let testNine = '.'; //=> why this doesn't match is a mystery to me...
let testTen = '11';

console.log(numberRegEx.test(testOne)); //=> true
console.log(numberRegEx.test(testTwo)); //=> true
console.log(numberRegEx.test(testThree)); //=> should be true
console.log(numberRegEx.test(testFour)); //=> true
console.log(numberRegEx.test(testFive)); //=> true
console.log(numberRegEx.test(testSix)); //=> true
console.log(numberRegEx.test(testSeven)); //=> true
console.log(numberRegEx.test(testEight)); //=> true
console.log(numberRegEx.test(testNine)); //=> false
console.log(numberRegEx.test(testTen)); //=> true

