// Exercise 4-2: Reversing an Array : DONE!!!

/*
	Arrays have a reverse method that changes the array by inverting
	the order in which its elements appear. For this exercise, write
	two functions, reverseArray and reverseArrayInPlace. 

        The first, reverseArray, takes an array as an argument and 
        produces a new array that has the same elements in the inverse 
        order. 

        The second, reverseArrayInPlace, does what the reverse method 
        does: it modifies the array given as an argument by reversing
	its elements. Neither may use the standard reverse method.
	
	Thinking back to notes about side effects and pure functions
	in "Functions and Side Effects" on page 54, which variant do
	you expect to be useful in more situations? Which one runs
	faster?
*/

let argError = new Error('ArguementError: You may only supply an array as an argument.');

arrArg = (arr) => {
  if (typeof arr !== 'object' || arr['length'] == undefined) {
    throw argError;
    return false;
  }
  return true;
}



reverseArray = (arr) => {
  let arrCopy = [];
  if (arrArg(arr) === false) {
    throw argError;
    return;
  } else {
    for(let i = arr.length - 1; i >= 0; i--){
      arrCopy.push(arr[i]);
    }
  }
  return arrCopy;
}



reverseArrayInPlace = (arr) => {
  if (arrArg(arr) === false) {
    throw argError;
    return;
  } else {
    if (arr.length === 1) {
      return arr;
    } else {
      for(let i = 1; i <= Math.floor(arr.length / 2); i++){
        sub = arr[i-1];
        arr[i-1] = arr[arr.length - i];
        arr[arr.length - i] = sub;
      }
      return arr;
    }
  }

}





try {
  // console.log(reverseArray([1,2,4,100]));
  console.log(reverseArrayInPlace(['r','a','c','e','c','a','r','s']));

} catch(e) {
  console.log(e);
}
