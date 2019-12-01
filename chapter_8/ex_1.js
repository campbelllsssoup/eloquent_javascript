// Exercise 8-1: Retry : DONE!!!

/*
    Say you have a function primitiveMultiply that in 20 percent of 
    cases multiplies two numbers and in the other 80 percent of cases
    raises an exception of type 'MultiplicationUnitFailure'. Write a 
    function that wraps this clunky function and just keeps trying 
    until a call succeeds, after which it returns the result.

    Make sure you handle only the exceptions you are trying to handle.
*/

class MultiplicationUnitError extends Error {};

function primitiveMultiply(num1, num2){
  let randomNum = Math.floor( Math.random(1) * 100 )
  if (randomNum < 80) {
    throw new MultiplicationUnitError("Multiplication failed.. retrying now.");
  } else {
    console.log(num1 * num2);
    return num1 * num2;
  }
}

function tryMultiply(){
  let result = undefined;
  let tries = 0;
  while (result === undefined){
    try {
      let rand1 = Math.floor(Math.random(1) * 100);
      let rand2 = Math.floor(Math.random(1) * 100);
      tries++;
      result = primitiveMultiply(rand1, rand2);
    } catch(e) {
      if (e instanceof MultiplicationUnitError) {
        console.log(e);
      }
    }
  }
  console.log('Number of tries:', tries);
  console.log('Your result is ', result);
  return result;
}

tryMultiply();


