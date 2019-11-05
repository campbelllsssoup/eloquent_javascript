// Exercise 5-3: Everything : DONE!!!

/*


	Analogous to the 'some' method, arrays also have an 'every' method.
        This one returns true when the given function returns true for every 
 	element in the array. In a way, some is a version of the || operator
	that acts on arrays, and every is like the && operator. 

	Implement every as a function that takes an array and a predicate 
	function as parameters. Write two versions, one using a loop and one
	using the some method.

    
        THOUGHTS / PSEUDO-CODE FOR 'someEvery' function:

        - Array.prototype.some allows you to see if at least one of the 
        items in the array satisfies the condition you pass it.

        - you could transform the whole array into a nested array, with
        each 2nd level array having only one value & then use the some
        method on each 2nd level array.. but i'm sure there's a better
        way.

	- to make the above way faster, you could 'divide & conquer' the
	array and use the some method on each resulting array instead of 
        initially splitting all of the numbers into individual arrays.
        This would cut out a few extra steps in most cases.

        REFLECTION:

        Did not complete the divide & conquer method of creating the someEvery
        function, but I will likely loop back to it. For now I've created a 
        'slowSomeEvery' as a humble substitute.

*/

function loopEvery(list, condition) {
  for (let i = 0; i < list.length - 1; i++ ){
    if ( !condition(list[i]) ) {
      return false;
    }
  }
  return true;
}

function slowSomeEvery(list, condition) {
  let listCopy = Array.from(list);
  listCopy = listCopy.flat(Infinity);
  listCopy = listCopy.map(function(el){
    return [el];
  });

  for (let i = 0; i < listCopy.length; i++) {
    if ( !(listCopy[i].some(condition)) ) return false;
  }

  return true;
}

function checkNumType(val) {
  return typeof val === 'number';
}

unknownArr = [{}, 'whyAmIHere?'];
evenArr = [1,2,3,4];
oddArr = [1,2,3,4,5];
nestedArr = [[1,2,43,[1,2,4,[1,25]]],12,12];

console.log(loopEvery(unknownArr, checkNumType));
console.log(loopEvery(evenArr, checkNumType));

console.log(slowSomeEvery(nestedArr, checkNumType));
console.log(slowSomeEvery(unknownArr, checkNumType));

/*

function someEvery(list, condition) {
  let lastRun = false;
  let listCopy = Array.from(list).flat(Infinity);

  if ( !listCopy.some(condition) ) return false;
  listCopy = [listCopy];
  newArr = [];

  while (lastRun === false) {
    for (let i = 0; i < listCopy.length; i++) {
      if (listCopy[i].length > 1) {
        newArr = splitArr(listCopy[i], newArr);
      } else {
        console.log("This isn't my first go-around...");
      }
    }
    console.log('list length', list.length);
    console.log('newArr length', newArr.length);  
    if (list.length <= newArr.length) lastRun = true;
    console.log('newArr', newArr);
    listCopy = newArr;
  }
 
  return true;
}

function splitArr(arrToSplit, storageArr) {
  let copyStorageArr = Array.from(storageArr);
  let copyArr = Array.from(arrToSplit);
  let mid = copyArr.length % 2 === 1 ? Math.ceil(copyArr.length/2) : copyArr.length/2;
  let half1 = copyArr.slice(0,mid);
  let half2 = copyArr.slice(mid,copyArr.length);

  copyStorageArr = [].push(half1, half2);
  return copyStorageArr;
}

function reduceBrackets(arr) {
  let result = [];
  arr.forEach(function(val){
    for (let i = 0; i < val.length; i++){
      if (val[i][0] === undefined) {
        result.push(val);
      } else {
        result.push(val[i]);
      }
    }
  })
  return result;
}

*/

