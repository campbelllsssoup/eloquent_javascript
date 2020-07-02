// Exercise 4-1: The Sum of a Range : DONE!!!


/*
	Write a range function that takes two arguments, start and end,
	and returns an array containing all the numbers from start up 
	to (and including) end.

	Next, write a sum function that takes an array of numbers and returns
	the sum of these numbers. Run the example program and see whether it 
	does indeed return 55.
	
	As a bonus assignment, modify your range function to take an optional
	third argument that indicates the 'step' value used when building the
	array. If no step is given, the elements go up by increments of one,
	corresponding to the old behavior.
	
	The function call range(1,10,2) should return [1,3,5,7,9]. Make sure
	it also works with negative step values so that range(5,2,-1) produces
	[5,4,3,2].


  Assume (#range):
  - All arguments are numbers.
  - For negative step values, end is less than start.
  - For positive step values, end is greater than start.
  - Step isn't equal to zero.
  - Start isn't equal to end.


  (#sum):
  - assume that user will provide only an array of numbers as an argument.

*/

const range = (start, end, step = 1) => {
  let numRange = [];
  if (step > 0) {
    for (let num = start; num <= end; num += step) {
      numRange.push(num);
    }
  } else {
    for (let num = start; num >= end; num += step) {
      numRange.push(num);
    }
  }
  return numRange;
}


const sum = (arr) => {
  return arr.reduce((arr, num) => arr + num);
}

console.log( sum(range(5, 2, -1)) ); //=> 14
console.log( sum(range(1, 10, 2)) ); //=> 25