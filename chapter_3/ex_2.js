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
*/

isEven = (num) => {

  numCopy = num;
  if (typeof numCopy !== 'number') {

    throw new Error('Wrong datatype supplied. Provide a Number as an argument.');

  } else {
    
    if (numCopy < 0) {
      numCopy = String(numCopy);
      numArr = numCopy.split('');
      numArr.shift();
      numCopy = Number(numArr.join(''));
    }

    while ( numCopy > 1 ) {
      numCopy -= 2;
    }

  }
  console.log(`Original Number: ${num}`);
  result =  numCopy == 0 ? true : false;
  console.log(`Result: ${result}`);
  return result;

}




try {

  isEven(50);
  isEven(75);
  // you may get funny behavior when using -1 as input
  // can you find a way to fix this?
  isEven(-100);
  isEven('one-thousand');
} catch(e) {

  console.log(e);
  
}
