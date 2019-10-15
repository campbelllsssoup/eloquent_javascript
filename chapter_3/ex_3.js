// Exercise 2-3: Bean Counting : DONE!!!

/*

	You can get the Nth character, or letter, from a string by writing "string"[N].
	The returned value will be a string containing only one character (for example,
	"b"). The first character has position 0, which causes the last one to be found
	at position string.length - 1. In other words, a two-character string has length
	2, and its character have positions 0 and 1.

	Write a function countBs that takes a string as its only argument and returns
	a number that indicates how many uppercase "B" characters there are in the string.

	Next, write a function called countChar that behaves like countBs, except it takes
	a second argument that indicates the character that is to be counted (rather than
	counting only uppercase "B" characters). Rewrite countBs to make use of this new
	function.

*/

countBs = (string) => {
  countChar(string, "B");
}


countChar = (string,char) => {

  if (typeof string !== 'string') {
    throw new Error('TypeError: This function only accepts a string as first and second arg.');
  } else if (char.length !== 1) {
    throw new Error('ArgumentError: The second argument can only be a single character.');
  }

  stringCopy = string;
  stringArr = stringCopy.split('');
  count = 0;

  for(let i = 0; i < stringArr.length; i++) {
    stringArr[i] === char ? count += 1 : undefined;
  }

  console.log(`There are ${count} ${char}'s in the string`);
  return count;

}


try {

  countBs('hello');
  countBs("BaBBling Brooks brood over cool waters.");

  // will throw Error
  // countChar("lliejghsoll", "L");
  // countChar(2345, 3);

} catch(e) {

  console.log(e);

}
