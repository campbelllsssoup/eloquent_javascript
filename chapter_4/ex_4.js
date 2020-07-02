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
*/

const compareKeys = (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  for (let i = 0; i < Object.keys(obj1).length; i++) {
    if (Object.keys(obj1)[i] !== Object.keys(obj2)[i]) return false;
  }
  return true;
}

const compareValues = (obj1, obj2) => {
  if (Object.values(obj1).length !== Object.values(obj2).length) return false;
  for (let i = 0; i < Object.values(obj1).length; i++) {
    if (Object.values(obj1)[i] !== Object.values(obj2)[i]) return false;
  }
  return true;
}

const deepEqual = (valOne, valTwo) => {
  if (typeof valOne !== 'object' && typeof valTwo !== 'object') {
    // return the result of strict comparison,, works becuase these are non-object values.
    return valOne === valTwo; 
  } else if (typeof valOne === 'object' && typeof valTwo === 'object') {
    // catch null values
    if (valOne === null || valTwo === null) return valOne === valTwo; 

    let oneType = valOne.constructor.name;
    let twoType = valTwo.constructor.name;
    // if the two objects weren't created by the same factory function, they're not the same.
    if (oneType !== twoType) { return false; } 
    else if (oneType === 'Object') {
      // use helper functions if both values are true objects.
      return compareValues(valOne, valTwo) && compareKeys(valOne, valTwo);
    } else if (oneType === 'Array') {
      // return false if the two arrays aren't the same legnth.
      if (valOne.length !== valTwo.length) return false; 
      // iterate through each index in the array and return false if any values don't match.  
      for (let i = 0; i < valOne.length; i++) {
        if (valOne[i] !== valTwo[i]) return false;
      }
      return true;
    }
  }
}

// testing...
const value1 = ['yolo', 'man'];
const value2 = ['yolo', 'ma'];
console.log(deepEqual(value1, value2));
