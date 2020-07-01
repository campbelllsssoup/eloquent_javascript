// Exercise 2-2: Recursion : DONE!!!

/*
	We've seen that % (the remainder or modulo operator) can be used to test whether
	a number is even or odd by using % 2 to see whether it's divisible by two. Here's
	another way to define whether a positive whole number is even or odd:
	
	* Zero is even.

	* One is odd.

	* For any other number N, its evenness is the same as N - 2.

	Define a recursive function 'isEven' corresponding to this description. The function
	should accept a single parameter (a positive, whole number) and return a Boolean.
	Test in on 50 and 75. See how it behaves on -1. Why? Can you think of a way to fix
	this?	

  I'm going to assume that the input will always be of the Number data type, 
  and that that number is an integer.
*/ 

const isEven = (n) => {
  let nClone = Number(n);

  // handles negative inputs by removing the negative sign from the number.
  if (n < 0) {
    nClone = Math.abs(n);
  }
  
  // handles base cases (1 = odd, 0 = even) + recursive call
  switch (nClone) {
    case 0: return true;
    case 1: return false;
    default: return isEven(nClone - 2);
  }
}

console.log(isEven(50)); //=> true
console.log(isEven(75)); //=> false
console.log(isEven(-100)); //=> true