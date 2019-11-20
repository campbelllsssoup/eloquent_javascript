// Exercise 5-4: Dominant Writing Direction : DONE!!!

let SCRIPTS = require('./scripts.js');

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

        3. Use methods to reduce the array into an object with properties of 
	"rtl", "ltr", "ttb" and values that correspond to that script characters
	direction.

	4. After receiving the resulting object, iterate over the object and return
	the script direction with the highest count of characters.
*/

// code arg is a number, specifies what the unicode is for the character

function textDirection(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to; 
    })) {
      return script.direction;
    }
  }
  return null;
}

// groupName is a separate function that computes a group
// name for the value in the collection

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++
    }
  }
  return counts;
}

function dominantDirection(string) {
  let chars = string.split("");
  let result;
  chars = chars.map((char) => {
    return char.charCodeAt();
  });
  directionCount = countBy(chars, textDirection);
  directionCount = directionCount.filter(direction => {
    if (direction.name !== null) {
      return direction;
    }
  })
  for (let i in directionCount){
    if (result == undefined) {
      result = directionCount[i];
    } else if (result.count < directionCount[i].count){
      result = directionCount[i]
    };
  }
  return result;
}

let mixedText = '"جس؛لکگفژ؛لسدکفگژ؛لاکدژفگ؛لکدسفکگژل؛سکدگسدفکگسدکفژگلکژسد؛لفکگژ؛لسدکفژگ؛لکژسد؛لفگژل؛سدکفژگ؛لژاد؛لفکگۆسادفگلک"中國哲學書電子化計劃"alskdjf"';

console.log(dominantDirection(mixedText));

