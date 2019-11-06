// Exercise 5-4: Dominant Writing Direction : NOT DONE...
const SCRIPTS = require('./scripts.js');

/*
	Write a function that computes the dominant writing direction in
	a string of text. Remember that each script object has a direction
	property that can be "ltr" (left to right), "rtl" (right to left),
	or "ttb" (top to bottom).

        The dominant direction is the direction of a majority of the 
	characters that have a script associated with them. The characterScript
	and countBy functions defined earlier in the chapter are probably useful
	here.


        PSEUDO-CODE:
        
        First, bring in the SCRIPT variable from the 'eloquentjavascript.net' site
        so that you can determine what the direction of a unicode character is.
        
        Then, create a function that's called 'dominantDirection' and takes in an
        argument of a string. 

        After the function is invoked, it should:

	1. Make a copy of that string.

	2. Turn that string into an array, with each element being an individual
	unicode character.
*/

console.log(SCRIPTS);

