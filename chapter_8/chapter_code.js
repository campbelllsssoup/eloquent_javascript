// Chapter 8 Code
// This is a list of code snippets in the chapter along an explanation
// for each one.

// "use strict";

// NOTE: After going through all of the chapter, go and uncomment all of the code
// examples that you've written instead of leaving everything commented out.

// 1. Strict Mode

/*
  Using strict mode in javascript gives us many benefits - there is
  no global object by default, so you never accidentally bind 
  functions to a global object (this helps you keep the global 
  namespace clear). Also, if you try to modify an object that is 
  frozen an error will be thrown, assures that argument names are
  unique, catches reassignment of a variable that cannot be reassigned -
  and much more.

  If you try to do many of the above activities in non-strict mode, 
  the program will just not perform the action you expect it to (fail
  silently) and you will not know that this happened until you're 
  running your program and don't see a variable is a value that you
  expected it to be, or an object's property didn't change the way 
  you expected it to.

  While some may not enjoy getting errors when running their program, 
  I always find it helpful to get a reminder from the interpreter because
  errors give you more information about why something doesn't work.
  So, in a way using strict mode is allowing us to get more information
  about our program before it does something we don't expect it to.
*/

function canYouSpotTheProblem() {
  'use strict';
  // to fix, simply instantiate counter with let, var, or const
  let counter = 0;
  for (let counter = 0;counter < 10; counter++){
    console.log("Happy happy");
  }
  while (counter < 10){
    console.log("who needs non-strict mode?!?!");
    counter++;
  }
}  

canYouSpotTheProblem();
console.log(globalThis);

/*
  In the above function, the issue is that when you supply the 
  conditions for the for loop, the counter variable was never 
  declared - it was only assigned. In normal javascript this would 
  not be an issue and counter would be a global variable.
  
  In strict mode global variables are not permitted and the code 
  will throw the following error: 
  > ReferenceError: counter is not defined

  In non-strict mode 'happy happy' will be output to the console 
  10 times, but if we wanted to use the counter variable somewhere
  else - we would see that it starts at 10 instead of whatever
  value that we set it to be. 

  NOTE: If you're in strict mode and you do not declare a variable
  and use a variable that is bound to the global object, your code
  will overwrite the value of the global variable. You don't want 
  to do this, so to be on the safe side just declare a local variable.

  The above feature is helpful because you're still allowed to access
  global variables if you need their values - if you want to be more
  verbose you can also access those variables with the following syntax
  `globalThis.variable` - this could make it extra clear to others
  reading your program of where the variable in question comes from.
*/


function whatIsThisNonStrict() {
  console.log(this);
  return this;
}

function whatIsThisStrict() {
  "use strict";
  console.log(this);
  return this;
}

whatIsThisNonStrict(); //=> globalThis value (window in browser, 
nodeJS module in Node.js environment)
whatIsThisStrict(); //=> undefined


/*
  the above code shows us that in non-strict mode, the 'this' keyword
  will return the global object if you are in the global scope.

  This differs from strict-mode, where 'this' in the global scope 
  will not return the global object, providing us yet another safeguard
  against polluting the global namespace.
*/

const iAmBound = () => {
  "use strict";
  console.log('arrow function declaration:', this);
}

function iAmUnbound() {
  "use strict";
  console.log('normal function declaration:', this);
}

let arrowObj = {a: 'a', iAmBound}
let normalObj = {b: 'b', iAmUnbound}
iAmBound(); //=> arrow function declaration: {}
iAmUnbound(); //=> normal function declaration: undefined

iAmBound.call(arrowObj); //=> arrow function declaration: {}
arrowObj.iAmBound(); //=> arrow function declaration: {}

normalObj.iAmUnbound(); //=> normal function declaration: {b: 'b', iAmUnbound: [Function: iAmUnbound]}

/*
  In non-strict and strict mode, calling iAmBound will output an empty 
  object as the value of 'this' - this is because iAmBound is not a method
  associated with an object. 
  
  Since strict mode handles arrow functions in this way - you must be mindful
  of the fact that once you declare the function in that manner, you can't expect
  to use it in an object and the value of 'this' change to the object's value.
  
  The arrow function is bound to the next highest obj in the lexical scope where
  it's declared - so calling arrowObj.iAmBound() returns an empty object - {} -
  instead of the arrowObj variable like you would expect it to. This is actually
  a feature of ARROW FUNCTIONS and not strict mode.

  In contrast - calling iAmUnbound on normalObj after including it as a method
  on normalObj DOES return normalObj. 

  NOTE: using call or apply after binding a function WILL NOT change the value of 
  this to the first argument supplied to the function - this will always remain what
  it initially was where you bound that function. This is a feature of BINDING in JS.

  In strict mode, calling iAmUnbound will output undefined to the console
  (because functions are not automatically bound to the global object in 
  strict mode).

  In non-strict mode, calling iAmUnbound will output the globalThis value
  to the console.

  Both functions are within the main-level lexical scope for the rest of the 
  program.
*/

function Person(name) { this.name = name; };
// forgot to use the 'new' keyword, so the below code binds a variable 'name' to the global object 
let ferdinand = Person("Ferdinand"); // to fix use the 'new' keyword before the constructor function
console.log(name); //=> Ferdinand
console.log(ferdinand) //=> undefined
console.log(globalThis.name); //=> Ferdinand
console.log(globalThis.name === name); //=> true

/*
  In strict mode, the interpreter will throw an error:
  //=> TypeError: Cannot set property 'name' of undefined

  This error is super helpful, because it makes you go back to your
  code and evaluate what this actually is in the moment that you call the 
  constructor function.

  If you were using the 'new' keyword - javascript would automatically create a new
  empty object, set 'this' to the empty object, run your constructor function, then
  return the object customized as you've set it up to be.

  If you're using the ES6 class syntax, you will not have to worry about the below
  issue because your program will always complain if you do not use the new keyword
  to instantiate an object - this is because the class keyword uses strict mode by 
  default. 

  NOTE: always set "use strict" at the top of your JS files. If you've come here to 
  play around with my code - be sure to uncomment and comment out "use strict" at the
  top of the file when needed, such as to play around with the piece of code below.
*/

function Person(name) { this.name = name; }
let ferdinand = Person('ferdinand');
console.log(ferdinand);

// 2. Types

/*
  Understanding what an argument's datatypes are that are being put into a function and 
  what datatype is returned from a function is a useful template for understanding a program
  overall. 

  Type checking is implemented in 'strongly typed' languages, such as Java, Rust, or TypeScript.
  For some people coming from dynamically typed languages - it may seem like a hassle to 
  have to declare a variable's type and declare what types a function's parameters will take in 
  and return - but for a very large program this provides more structure and an easy way to 
  know what to expect from a function and/or variable.

  TypeScript is becoming quite popular for this reason and I would highly suggest that anyone 
  reading this look into it. However, it is not a 'need' in order to write useful programs - and
  many great things have been built without strongly typed javascript e.g. TypeScript.
*/

// 3. Testing

function test(label, body) {
  if (!body()) console.log(`Failed: ${label}`);
}

test("convert Latin text to uppercase", () => {
  return "hello".toUpperCase() == "HELLO";
});
test("convert Greek text to uppercase", () => {
  return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
});
test("don't convert case-less characters", () => {
  return "مرحبا".toUpperCase() == "مرحبا";
});

/*
  The above function 'test', takes in a label to describe in english what
  a test is supposed to accomplish and a second argument of a function 
  to run that will evaluate true or false.

  If a test case evaluates to false, then we know we have something to 
  go back and fix inside of our function / code. This is what's known
  as TDD (test-driven development).

  It may take more time to write tests for your code, but at the end of 
  the day it allows you to quickly evaluate whether your program is behaving
  as expected in just a few seconds - this is better than testing it 
  manually (BDD - behavior driven development) because the few minutes you 
  take to write tests could be hours that you save testing something manually. 
  Productivity is power.

  Tests will never be written as they are above - typically you'll use different 
  test suites such as mocha w/ chai ,, or jest. They provide a DSL that makes it
  easy to understand what behavior you expect from your program.

  Self-contained persistent objects are easier to test when compared to testing
  changing objects and/or testing an object in the context of many other objects.

  Flaky test - a test that has a non-deterministic outcome (passes sometimes, and
  fails other times for no apparent reason). These happen for different reasons, 
  and if you'd like to learn more about it there are many resources online to do so.
*/

// 4. Debugging


function numberToString(n, base = 10){
  let result = '', sign = '';
  if (n < 0) {
    sign = '-';
    n = -n;
  }
  do {
    // console.log(String(n % base)); //=> initially n is a long float - I expected it to be the 
    // next digit that I want to add to the result string.

    // String(n % base) produces 3 as expected the first time around, second
    // time around we get unexpected behavior as the result is 1.3 instead of 1..
    // I suppose I can just round 1.3 down to get to the next digit in the number and
    // set the result of that calculation to be the new n.

    result = String(n % base) + result;
    // console.log(Math.floor(n / base)); // WORKS!!
    n = Math.floor(n / base);
  } while (n > 0);
  return sign + result;
}

console.log(numberToString(13, 10));

/*
  The above function doesn't return what you'd expect it to, instead of returning
  a string '13' by iterating over each digit and then adding it to the previous 
  result - it returns a ridiculously long float.

  The best way to debug the above function is to go through the following process:

  1) Come up with a hypothesis for why the unexpected behavior is occuring.

  2) Gather information about how the function is running, I usually do this by
  inserting console logs into the part of the code that I think is misbehaving.

  3) Evaluate the evidence you've gathered - are things behaving as you expected 
  them to be at that point in your code? If not, how can you fix it? If it is, 
  where is another point you could insert a console.log in order to gather more 
  information?

  4) If you have thought of a possible solution to the issue at this point, change
  one point of the code that you think might fix it (don't change whole swathes of 
  code - work piece by piece).

  5) Re-run the function and see if it behaves as expected. If it doesn't start again
  from step 1.

  6) If the function does work as expected - rejoice! You've just resolved the bug.
*/

// 5. Error Propagation

/*
  When you're writing programs, you want to handle bad input and/or failures, 
  such as a user not putting in an email when you ask them for it on a sign-up 
  page, or give users feedback regarding issues with the network failing.

  Different situations call for different reactions to failure in your program,
  and they should be evalutated on a topic-by-topic or case-by-case basis depending
  on what you're working on.
*/

function promptNumber(question){
  let result = Number(prompt(question));
  if (Number.isNaN(result)) {
    return promptNumber(question);
  } else {
    return result;
  }
}

let age = promptNumber("How old are you?");
let header = document.querySelector('h1');
header.innerHTML += ` ${age}`;

/*
  The above code asks a user for their age, and if they enter anything that is 
  not a number it will continually prompt them for their age.

  After getting a user's age, it will display their age on the page next to a
  piece of text that says "Your age: "
*/

function lastElement(array){
  if (array.length == 0){
    return {failed: true};
  } else {
    return {element: array[array.length - 1]};
  }
}

let arr = [1,2,3];
let emptyArr = [];

console.log(lastElement(arr)['element'])
console.log(lastElement(emptyArr)['failed'])

/*
  The above function handles the case where an input / result can be any datatype -
  in order to distinguish success from failure we wrap the result of the function 
  inside of an object. If the function succeeded then we return an object with a
  property element whose value is the last element is the array.

  If the function fails - then we will get an object with a property of failed, 
  its value set to true.

  This is similar to the way that response objects represent failures/successes when
  making network requests && also how the classic callback way of programming asynchronous
  actions returns results.
*/

// 6. Exceptions

/*
  Exception - mechanism that makes it possible for code that runs into a problem to
  raise/throw an error/exception.

  Exception handling - allows you to catch exceptions when they happen and perform
  another sequence of code that you'd like to happen instead of just letting the 
  program crash / fail.

  Can be especially useful when conditions may arise that cause a system to crash.

  Normally, when errors are thrown within a program without any conditions to catch 
  them, the program fails in a way that all of the stack is unwound completely. 
  In order to stop this default behavior, you can set 'obstacles' in the 
  program that will stop the unwinding of the stack at a certain point in the program
  and allow you to define alternate behavior for when it fails. These 'obstacles' 
  CATCH the exceptions/errors. Typically this involves writing code that allows your
  program to continue running as normal, EVEN THOUGH it encountered an error.
*/

function promptDirection(question){
  let result = prompt(question);
  if (result.toLowerCase() == 'left'){
    return "L";
  } else if (result.toLowerCase() == 'right'){
    return "R";
  } else {
    throw new Error("Invalid direciton: " + result);
  }
}

function look(){
  let youSee = document.querySelector('p')
  if(promptDirection("Which way? (Type 'right' or 'left')") == "L"){
    youSee.innerHTML += 'a house';
    return 'a house';
  } else {
    youSee.innerHTML += 'two angry bears';
    return 'two angry bears';
  }
}

try {
  console.log("You see", look());
} catch (error) {
  let youSee = document.querySelector('p');
  youSee.innerHTML += 'a cliff edge';
  console.log("Something went wrong... ", + error);
}

// 7. Cleaning Up After Exceptions

/*
  Use the 'finally' keyword to wrap-up! This keyword allows you to execute a block of code
  regardless of whether an error was thrown or not.
*/

const account = {
  a: 100,
  b: 0,
  c: 20
}

function getAccount() {
  let accountName = prompt("Enter an account name:");
  if (!accounts.hasOwnProperty(accountName)) {
    throw new Error(`No such account: ${accountName}`);
  }
  return accountName;
}

function transfer(from, amount) {
  if (accounts[from] < amount) return;
  accounts[from] -= amount;
  accounts[getAccount()] += amount;
}

/*
  The issue with the above code is that in the transfer function, money is taken
  out of the sender's account before whether the user has an account with the bank
  is verified. One way to solve this would be to call getAccount() before taking
  the money out of the sender's account - thereby avoiding the issue of the sender
  having money taken out of their account that was not transferred.

  Another way of handling this issue could be to use a finally statement at the end
  of a try/catch block.
*/

function transfer(from, amount){
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount()] += amount;
    // if the above line throws an error, progress will never be set to 2, 
    // allowing us to verify whether or not the function succeeded or threw an error
    progress = 2;
  } finally {
    // below, we handle for the case of if getAccount() throws an error, by adding the
    // money back into the account that we took out initially.
    if (progress == 1) {
      accounts[from] += amount;
    }
  }
}

/*
  NOTE: I do not think the way that the above code is written is the cleanest way to 
  handle this specific issue, but I do appreciate the example for the fact that they 
  are using it to explain how to use finally.

  I'm sure there are better examples/use cases of where to use the 'finally' keyword.
*/

// 8. Selective Catching

/*
  Javascript doesn't provide support for selectively catching errors, you can only
  catch all errors or no errors. This makes it easy to assume that when a piece of
  code within your try block throws an error - it's the error that you expected to 
  arise within your program (the Error you created in response to a certain outcome).

  How can we be sure that we perform an action based on the error we expect to catch?

  1) You could have an if statement inside of your catch block that checks for the 
  message of the error that is thrown.

  BUT, solving this issue through route 1 isn't the best way, because if the error 
  message is changed to be another thing OR if the message is  converted to another 
  language the program doesn't work properly anymore. 

  So how can we solve this issue in a way that makes more sense?

  We could create a new type of error by creating a class that extends from the 
  error class - but has a different name to describe what type of error it is -
  for example: InputError instead of throwing just Error. This would survive
  language translations and error message changes gracefully.
*/

for (;;) {
  try {
    let dir = promtDirection("Where? (type 'right' or 'left')."); // <- example types 
    // prompDirection instead of the correct 'promptDirection' - so this loop will 
    // never prompt the user and continue in an infinite loop.
    if (dir === 'left' || dir === 'right') {
      console.log("You chose ", dir);
      break;
    }
  } catch (e) {
    console.log('Not a valid direction. Try again.');
  }
}

/*
  The above piece of code is an example where an error is thrown and it isn't because 
  the user has input an invalid direction - but actually because promptDirection is 
  misspelled.

  In this example it's clear - since we don't throw an error for incorrect user input
  - that the error is being caused by something other than the user input. 
*/

class InputError extends Error {};

function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == 'left') return "L";
  if (result.toLowerCase() == 'right') return "R";
  throw new InputError("Invalid Direction: " + result)
}

for (;;) {
  try {
    let dir = promptDirection("Where?");
    console.log("You chose ", dir);
    break;
  } catch (e) {
    if (e instanceof InputError) {
      console.log("Not a valid direction. Try again."); // selectively catches a user input
      //  error
    } else {
      throw e; // allows an error to continue to unwind the stack completely
    }
  }
}

// 9. Assertions

/*
  Assertion - a check inside a program that verifies whether something is the way it supposed
  to be. Not intended to handle situations that may happen 'normally' during a program's 
  operation (graceful crashes) - but rather they are used to find programmer mistakes.
*/

function firstElement(array) {
  if (array.length === 0) {
    throw new Error("firstElement called with []");
  }
  return array[0];
}

/*
  In the above example, if you call firstElement with an empty array supplied as the 
  argument, instead of the function returning undefined (this is what would happen
  if you didn't include the if statement) an error will be thrown that describes 
  the undesired behavior that occured. 

  It's not advised to write assertions for every single type of bad input - assertions 
  are usually reserved for mistakes that are easy to make as a programmer.
*/


