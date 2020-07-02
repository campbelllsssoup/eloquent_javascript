// Exercise 4-2: Reversing an Array : DONE!!!

/*
	Arrays have a reverse method that changes the array by inverting
	the order in which its elements appear. For this exercise, write
	two functions, reverseArray and reverseArrayInPlace. 

        The first, reverseArray, takes an array as an argument and 
        produces a new array that has the same elements in the inverse 
        order. 

        The second, reverseArrayInPlace, does what the reverse method 
        does: it modifies the array given as an argument by reversing
	      its elements. Neither may use the standard reverse method.
	
	Thinking back to notes about side effects and pure functions
	in "Functions and Side Effects" on page 54, which variant do
	you expect to be useful in more situations? Which one runs
  faster?
  
  NOTE: Assume that 
*/

reverseArray = (arr) => {
  let arrCopy = [];
  for (let i = arr.length - 1; i > -1; i--) {
    arrCopy.push(arr[i]);
  }
  return arrCopy;
}

reverseArrayInPlace = (arr) => {
  for (let i = 0; i <= Math.floor(arr.length / 2); i++) {
    sub = arr[i];
    arr[i] = arr[arr.length - i - 1];
    arr[arr.length - i - 1] = sub;
  }
  return arr;
}

console.log( reverseArray(['a', 's', 'l', 'u', 'T']) ); //=> [ 'T', 'u', 'l', 's', 'a' ]
console.log( reverseArrayInPlace(['a', 't', 'n', 'a', 'l', 't', 'A']) ); //=> [ 'A', 't', 'l', 'a', 'n', 't', 'a' ]
