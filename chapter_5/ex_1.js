// Exercise 5-1: Flattening : DONE!!!

/*
	Use the reduce method in combination with the concat method to 
	'flatten' an array of arrays into a single array that has all
	the elements of the original arrays. 
-----------------------------------------------------------------------
        Problem: for some reason, flattenedArr is a number instead of
        an array. Maybe the reduce method takes the first 
        argument you pass to it and automatically coerces the
        type to a number, regardless of what you pass to it?
  
         Solution: when you were using the reduce method you forgot to 
         pass in a second argument that serves as the starting
         value for the sum. You suspected that the variable
         that was being declared outside of the reduce method
         (flattenedArr), would automatically be read as an 
         array and you would be able to use all of the methods
         that live on its prototype property - but instead you
         were getting an error that "flattenedArr doesn't have
         the concat method". The way to fix this is to provide
         'flattenedArr' as the second argument to the reduce
         method and to remember that in your function definition
         (first argument for Array.prototype.reduce) you are just
         creating an argument that serves as a local variable to 
         that function - not calling the function with the 
         'flattenedArr' argument. 

         It was a simple problem to fix, but you must get used to 
         using these callback functions and not mix things like 
         like this up in the future.
*/

findArr = (arr) => {
  result = arr.find((el) => { if (typeof el === 'object') return el; });
  return !!(result)
}

flatten = (arr) => {
  typesArr = arr.map((el) => (typeof el));

  if (findArr(typesArr) === false) {
    return arr;
  } else {
    arr = arr.reduce((newArr, el) => {
      return newArr.concat(el);
    }, []);
    return flatten(arr); 
  }
}

nestedArr = [1,2,3,4,5,6,7];

console.log(`Testing...`);
console.log(flatten(nestedArr));
