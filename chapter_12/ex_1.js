// Exercise 12-1: Arrays : DONE!!!

/*
  Add support for arrays to Egg by adding the following three functions to the
  top scope: 

  1) array(...values) to construct an array containing the argument values, 

  2) length(array) to get an array's length, 

  3) and element(array, n) to fetch the nth element from an array.
*/

let { run, topScope } = require('./12_language.js');

topScope.array = (...values) => {
  return values;
}

topScope.length = (arr) => {
  if (arr.constructor.name != 'Array') { 
    throw new TypeError("Argument must be an array");
  }
  return arr.length;
}

topScope.element = (arr, n) => {
  if (arr.constructor.name != 'Array') { 
    throw new TypeError("Argument must be an array");
  }
  return arr[n];
}

run(`
  do(define(arr, array(1,2,3)),
     print(arr),
     define(el, element(arr, 2)),
     print(el))
`);

// => [1,2,3]
// => 3