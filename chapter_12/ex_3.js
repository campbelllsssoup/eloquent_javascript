// Exercise 12-3: Comments : DONE!!!

/*
  It would be nice if we could write comments in Egg. For example, whenever we 
  find a hash sign (#), we could treat the rest of the line as a comment and 
  ignore it, similar to '//' in JavaScript.

  We do not have to make any big changes to the parser to support this. We can 
  simply change skipSpace to skip comments as if they are whitespace so that all 
  the points where skipSpace is called will now also skip comments. Make this 
  change.
*/

// changes to skipSpace have been made in 12_language_alt.js, before and after
// are located below the tests.

let { parse } = require('./12_language_alt.js');

console.log(parse);
console.log(parse("# hello\nx"));
// → {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}


// Before changes
function skipSpace(string) {
  let first = string.search(/\S/); //returns location of first non-space char
  if (first == -1) return "";
  return string.slice(first);
}

// After changes
function skipSpace(string) {
  let first = /(\s|#.*\s)*/.exec(string)[0].length;
  // the above matches the first comment or space character, and from that
  // object we access the resulting string and read its' length so we know
  // how many chars to slice off the beginning of the string
  if (first == -1) return "";
  return string.slice(first);
}