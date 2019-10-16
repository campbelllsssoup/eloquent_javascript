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
*/


range = (start, end, step = 1) => {
  let rangeCollection = [];

  if (typeof start !== 'number' || 
      typeof end !== 'number' ||
      typeof step !== 'number') {
    throw new Error('ArgumentError: all arguments must be numbers.');  
  } else {

    if (step >= 0) {
      for(let i = start; i <= end; i += step){
        rangeCollection.push(i);
      }
    } else {
      for(let i = start; i >= end; i += step){
        rangeCollection.push(i);
      }
    }
  }
  return rangeCollection;
}

numsOnly = (arr) => {
  if (typeof arr !== 'object' || arr['length'] == undefined) {
    throw new Error('ArguementError: You may only supply an array as an argument.');
  } else {
    for (i=0;i<arr.length;i++){
      if (typeof arr[i] !== 'number') return false;
    }
  }
  return true;
}

sum = (arr, count = 0) => {
  if (typeof arr !== 'object' || arr['length'] === undefined) {
    throw new Error('ArguementError: You may only supply an array as an argument.');
  } else if (numsOnly(arr) === false) {
    throw new Error('ArgumentError: Your array may only contain numbers as entries.');
  } else {
    for (i=0;i<arr.length;i++){
      count += arr[i];
    }
  }
  return count;
}

try {
 // console.log(range(1,10));
 // console.log(range(100,1,-1));
 // console.log(sum([1,2,3,4,5]));
 console.log(sum(range(1,10)));
} catch(e) {
  console.log(e);
}
