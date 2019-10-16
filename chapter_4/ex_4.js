// Exercise 4-4: Deep Comparison : DONE!!!

/*
	The == operator compares objects by identity. But sometimes you'd prefer
	to compare the values of their actual properties.

	Write a function 'deepEqual' that takes two values and return true only
	if they are the same value or are objects with the same properties, where
	the values of the properties are equal when compared with a recursive call
	to 'deepEqual'.

	To find out whether the values should be compared directly (use the === 
	operator for that) or have their properties compared, you can use the 
	typeof operator. If it produces "object" for both values, you should do a
	deep comparison. But you have to take one silly exception into account:
	because of a historical accident, typeof null also produces "object".

        The Object.keys function will be useful when you need to go over the 
	properties of objects to compare them.

        First if checks if the two value types are the same.
        Second if (else if) checks if the two values types that are object at their base
        are the same or different (instance of Array is an 'object' type and so is Object, but 
        both do not have the same properties.)

*/

compareKeys = (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  } else {
    for(let i = 0; i < Object.keys(obj1).length; i++){
      if (Object.keys(obj1)[i] !== Object.keys(obj2)[i]) return false;
    }
  }
  return true;
}

compareValues = (obj1, obj2) => {
  if (Object.values(obj1).length !== Object.values(obj2).length) {
    return false;
  } else {
    for(let i = 0; i < Object.values(obj1).length; i++){
      if (Object.values(obj1)[i] !== Object.values(obj2)[i]) return false;
    }
  }
  return true;
}

deepEqual = (val1, val2) => {
  if (typeof val1 === typeof val2 && typeof val1 !== 'object') {
    return val1 === val2 ? true : false;
  } else if (typeof val1 === typeof val2 && typeof val1 === 'object') {
    if (val1 === null || val2 === null) return false;

    // currently only comparing objects of the normal object type.
    // need to also account for arrays.

    if (compareValues(val1,val2) === false || compareKeys(val1,val2) === false) return false;
  }
  return true;
}

value1 = ['Matthew', 98];
value2 = ['Matthew', 989];

// console.log(Object.values(value1));
// console.log(Object.values(value2));
// console.log(Object.values(value1) === Object.values(value2));

console.log(deepEqual(value1, value2));
