// Exercise 2-1: Minimum


/*
	Build a function that takes two or more arguements and returns the minimum from
	the arguments. (Rebuild the Math.min() function)
*/


minimum = (...nums) => {

  if (nums.length <= 1) {
    throw Error(`Given ${nums.length} arguments, expected 2..unlimited`);
  } else {
    let min = nums[0];
    nums.forEach((currentNum) => { currentNum < min ? min = currentNum : undefined  });
    console.log(min);
  }

  return undefined;
}

try {
  minimum(12,2345,1,19038457,-934875);
} catch(e) {
  console.error(e);
}

