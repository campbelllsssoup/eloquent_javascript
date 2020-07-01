// Exercise 2-1: Minimum : DONE!!!


/*
	Build a function that takes two or more arguements and returns the minimum from
	the arguments. (Rebuild the Math.min() function)
*/

const minimum = (...nums) => {
  let min = nums[0];
  nums.forEach(num => {
    min = num < min ? num : min;
  });
  return min;
}

minimum(1,2,-11); //=> -11
