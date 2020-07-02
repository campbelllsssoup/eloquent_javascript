// Exercise 4-3: A List : DONE!!!

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

// List.prototype.insertHead
const prepend = (element, list) => {
  let newList = {data: element, pointer: list}
  return newList;
}

// Array.toList
const arrayToList = (arr) => {
  let list = null;
  for (let i = arr.length - 1; i > -1; i--) {
    list = prepend(arr[i], list);
  }
  return list;
}

// List.toArray
const listToArray = (headNode) => {
  let arr = [];
  let currNode = headNode;
  while (currNode.pointer) {
    arr.push(currNode.data);
    currNode = currNode.pointer;
  }
  arr.push(currNode.data);
  return arr;
}

// List.prototype.getAt
const nth = (n, list) => {
  if (!list) return null;
  let listCopy = {...list};
  for (let i = 0; i < n; i++) {
    listCopy = listCopy.pointer;
    if (!listCopy) return null;
  }
  return listCopy.data;
}

// List.prototype.getAt
const recursiveNth = (n, list) => {
  if (list === null) {
    return null;
  } else if (n === 0) {
    return list.data;
  } else {
    return recursiveNth(n - 1, list.pointer);
  }
}

// testing...
let mattList =  { data: 'Hello', 
                  pointer: {
                    data: 'there', 
                    pointer: {
                      data: 'neighbor!',
                      pointer: null
                    }
                  }
                };
let mattArr = ['Hello', 'there', 'neighbor!'];
console.log( listToArray(mattList) ); //=> ['Hello', 'there', 'neighbor!']
console.log( arrayToList(mattArr) ); //=> mattList
console.log( nth(400, mattList) ); //=> null
console.log( nth(2, mattList) ); //=> { data: 'neighbor!', pointer: null }
console.log( recursiveNth(400, mattList) ); //=> null
console.log( recursiveNth(2, mattList) ); //=> { data: 'neighbor!', pointer: null }