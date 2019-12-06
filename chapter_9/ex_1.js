// Exercise 9-1: Regexp Golf : NOT DONE...

/*
    Code golf is a term used for the game of trying to express
    a particular program in as few characters as possible. 
    Similarly, regexp golf is the practice of writing as tiny a
    regular expression as possible to match a given pattern, and only
    that pattern.

    For each of the following items, write a regular expression to
    test whether any of the given substrings occur in a string. The 
    regular expression should match only string containing one of the
    substrings described. Do not worry about word boundaries unless
    explicity mentioned. When your expression works, see whether 
    you can make it any smaller.

    1. 'car' and 'cat'
    2. 'pop' and 'prop'
    3. 'ferret', 'ferry', and 'ferrari'
    4. Any word ending in 'ious'
    5. A whitespace character followed by a period, comma, colon,
    or semicolon
    6. A word longer than six letters
    7. A word without the letter e (or E)
*/

// 1) WORKS!!!

// let regExpOne = /ca[rt]/;

// let testOne = 'camcapcar';
// let testTwo = 'campaccat';
// let testThree = 'campaccal';

// console.log(regExpOne.test(testOne)); //=> true
// console.log(regExpOne.test(testTwo)); //=> true
// console.log(regExpOne.test(testThree)); //=> false

// 2) WORKS!!!

// let regExpTwo = /pr?op/;

// let testFour = "turbo-prop";
// let testFive = "push-pop";
// let testSix = "proppopnotslop";
// let testSeven = "hellojellopoiproip";

// console.log(regExpTwo.test(testFour));  //=> true
// console.log(regExpTwo.test(testFive)); //=> true
// console.log(regExpTwo.test(testSix));  //=> true
// console.log(regExpTwo.test(testSeven)); //=> false

// 3) WORKS!!!

// let regExpThree = /ferr(et|y|ari)/;

// let testEight = "brand new ferry";
// let testNine = "sexy ferrari";
// let testTen = "same ol' ferret";
// let testEleven = "ferrousferritferroriferri";

// console.log(regExpThree.test(testEight)); //=> true
// console.log(regExpThree.test(testNine)); //=> true
// console.log(regExpThree.test(testTen)); //=> true
// console.log(regExpThree.test(testEleven)); //=> false

// 4) WORKS!!!

// let regExpFour = /\b.*(ious)$/;

// let testTwelve = "furious";
// let testThirteen = "curious";
// let testFourteen = "superfluous";

// console.log(regExpFour.test(testTwelve)); //=> true
// console.log(regExpFour.test(testThirteen)); //=> true
// console.log(regExpFour.test(testFourteen)); //=> false

// 5) NOT DONE...

