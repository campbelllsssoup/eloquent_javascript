// Exercise 1-3: Chessboard : DONE!!!

/*

	Write a program that creates a string that represents a 8 x 8 grid,
	using new-line characters to separate lines. At each position of the
	grid there is either a space or a # character. The characters should
	form a chessboard. Passing this string to console.log should show
	something like this: 

	 # # # #
        # # # #
	 # # # #
        # # # #
	 # # # #
        # # # #
	 # # # #
        # # # #

	When you have a program that generates this pattern, define a binding
	size = 8 and change the program so that it works for any size, outputting
	a grid of the given width and height.

*/

let chessboard = function(size) {
  let str = '';
  for (let i = 0; i < size; i++){
    for (let j = 0; j < size; j++){
      if ( (i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1) ) { // if both numbers are odd, or both are even add space.
        str += ' ';
      } else {
        str += '#';
      }
    }
    str += '\n';
  }
  console.log(str);
};

chessboard(8);
