// Exercise 5-2: Your Own Loop : DONE !!!

/*
	Write a higher-order function loop that provides something like a 
	for loop statement. It takes a value, a test function, an update
        function, and a body function.

        Each iteration, it first runs the test function on the current loop
        value and stops if that returns false. Then it calls the body function,
        giving it the current value. Finally, it calls the update function to 
        create a new value and start from the beginning. 

	EACH ITERATION:

	1. Run the test function on the current loop value - stop if it returns
	false.

	2. After test function, call the body function - supplying the value
	as an argument.

	3. Call the update function to create a new value and start from the 
	beginning.

        When defining the function, you can use a regular loop to do the actual
        looping.


        Assuming that a suspected value should be an array ONLY.
        Assuming that the user will only provide an array, so I'm not checking if 
        the value provided is an array.

        APOLOGIES FOR ANYONE EXPECTING TO GARNER ENLIGHTENMENT:
	This example, though simple, is quite undirected. Because of
	this, I have produced an unspiring example and piece of code.
        If I had to create a for loop in it's entirety - without USING
	a for loop, I could've attempted that. BUT, this is just a weird
        exercise in Eloquent Javascript so, I did not do this.   

*/



function myLoop(value, testFunction, updateFunction, bodyFunction) {
  console.log('Array of numbers?', value);  
  for (let i = 0; i < value.length - 1; i++ ){
    if ( testFunction(value[i]) ) {
      bodyFunction(value[i]);
      updateFunction(value[i]);
    } 
  }

}

// TESTING:

// test case assumes you have an array of numbers and we will
// iterate over each number and add one if the current number is
// even.

function test(val) {
  return val % 2 === 0 ? true : false;
}

function update(val) {
  console.log('updated');
}

function addOne(val) {
  console.log('Previous value', val);
  console.log('Adding one..');
  val += 1;
  console.log('Updated value', val);
  return val;
}

let nums = [1,2,3,4,5,100,234,57];

myLoop(nums, test, update, addOne);
