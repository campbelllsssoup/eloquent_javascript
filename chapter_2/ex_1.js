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

let loopTriangle = function() {
  let hashes = '';
  while (hashes.length < 7) {
    hashes += '#';
    console.log(hashes);
  }
  return undefined;
}

loopTriangle();

