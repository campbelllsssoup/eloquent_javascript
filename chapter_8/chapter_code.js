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

// CODE
// function canYouSpotTheProblem() {
//   'use strict';
//   // to fix, simply instantiate counter with let, var, or const
//   let counter = 0;
//   for (let counter = 0;counter < 10; counter++){
//     console.log("Happy happy");
//   }
//   while (counter < 10){
//     console.log("who needs non-strict mode?!?!");
//     counter++;
//   }
// }  

// canYouSpotTheProblem();
// console.log(globalThis);

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

// CODE
// function whatIsThisNonStrict() {
//   console.log(this);
//   return this;
// }

// function whatIsThisStrict() {
//   "use strict";
//   console.log(this);
//   return this;
// }

// whatIsThisNonStrict(); //=> globalThis value (window in browser, 
// nodeJS module in Node.js environment)
// whatIsThisStrict(); //=> undefined


/*
  the above code shows us that in non-strict mode, the 'this' keyword
  will return the global object if you are in the global scope.

  This differs from strict-mode, where 'this' in the global scope 
  will not return the global object, providing us yet another safeguard
  against polluting the global namespace.
*/

// CODE
// const iAmBound = () => {
//   "use strict";
//   console.log('arrow function declaration:', this);
// }

// function iAmUnbound() {
//   "use strict";
//   console.log('normal function declaration:', this);
// }

// let arrowObj = {a: 'a', iAmBound}
// let normalObj = {b: 'b', iAmUnbound}
// iAmBound(); //=> arrow function declaration: {}
// iAmUnbound(); //=> normal function declaration: undefined

// iAmBound.call(arrowObj); //=> arrow function declaration: {}
// arrowObj.iAmBound(); //=> arrow function declaration: {}

// normalObj.iAmUnbound(); //=> normal function declaration: {b: 'b', iAmUnbound: [Function: iAmUnbound]}

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

// CODE
// function Person(name) { this.name = name; };
// forgot to use the 'new' keyword, so the below code binds a variable 'name' to the global object 
// let ferdinand = Person("Ferdinand"); // to fix use the 'new' keyword before the constructor function
// console.log(name); //=> Ferdinand
// console.log(ferdinand) //=> undefined
// console.log(globalThis.name); //=> Ferdinand
// console.log(globalThis.name === name); //=> true

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

// CODE
// function Person(name) { this.name = name; }
// let ferdinand = Person('ferdinand');
// console.log(ferdinand);

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



