// Exercise 1-1: Looping a Triangle : DONE!!!

/*
	Write a loop that makes seven calls to console.log to output the following triangle:

	-----------------------------------------------------------------------------------
        #
	##
	###
	####
	#####
	######
	#######
	-----------------------------------------------------------------------------------
*/

loopTriangle = function() {
  pound = '#';
  for (let i = 1; i <= 7; i++ ){
    console.log(pound);
    pound += '#';
  }
  return undefined;
}

loopTriangle();

