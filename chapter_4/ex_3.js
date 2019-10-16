// Exercise 4-3: A List : NOT DONE...

/*

	Objects, as generic blobs of values, can be used to build all sorts of 
	data structures. A common data structure is the list (not to be confused
	with array). A list is a nested set of objects, with the first object
	holding a reference to the second, the second to the third, and so on.
	
	A nice thing about lists is that they can share parts of their structure. 
	For example, if I create two new values {data: 0, pointer: list} and
	{data: -1, pointer: list} (with list referring to the binding defined 
	earlier), they are both independent lists, but they share the structure
	that makes up their last three elements. The original list is also still
	a valid three-element list.

	Write a function arrayToList that builds up a list structure like the one
	shown when given [1,2,3] as an argument. Also write a listToArray function
	that produces an array from a list. 

        Then add a helper function 'prepend',
	which takes an element and a list and creates a new list that adds the 	
	element to the front of the input list, and 'nth', which takes a list and 
	returns the element at the given position in the list (with zero referring
	to the first element) or undefined when there is no such element.

	If you haven't already, also write a recursive version of 'nth'.

*/

arrayToList = (arr) => {
  let arrCopy = Array.from(arr);
  let list = {};

  for(let i = arrCopy.length - 1; i >= 0; i--){
    let newList = {};

    if (Object.keys(list).length === 0) {
      newList.data = arrCopy[i];
      newList.pointer = undefined;
    } else {
      newList.data = arrCopy[i];
      newList.pointer = list;
    } 

    list = newList;
  }
  
  return list;
}


listToArray = (list) => {
  let listCopy = {...list};
  let arr = [];

  while (listCopy.pointer !== undefined) {
    arr.push(listCopy['data']);
    listCopy = listCopy['pointer'];
  }
  arr.push(listCopy['data']);

  return arr;
}


prepend = (element, list) => {
  let newList = {data: element, pointer: list}
  return newList;
}

// If n === 0, then you are looking for the first element.

nth = (n, list) => {
  let listCopy = {...list}

  for(let i = 0; i < n; i++) {
    listCopy = listCopy.pointer;
    if (listCopy === undefined) return undefined;
  }
  return listCopy.data;

}



recursiveNth = (n, list) => {
  console.log(`Current n`, n);
  console.log(`Current list:`, list.pointer);

  if (n === 0) {
    return list.data;
  } else if (list === undefined) {
    return undefined;
  } else {
    list = list.pointer;
    n -= 1;
    return recursiveNth(n, list);
  }
}





let newNewList = arrayToList([1,2,3]);
console.log(`[1,2,3] to list:`, newNewList);

let secondData = recursiveNth(1, newNewList);
let firstData = recursiveNth(0, newNewList);

console.log(`Second Data, newNewList:`, secondData);
console.log(`First Data, newNewList:`, firstData);
