// Exercise 6-4: Borrowing a Method : DONE!!!

/*

	Earlier in the chapter I mentioned that an object's hasOwnProperty
	can be used as a more robust alternative to the in operator when 	
	you want to ignore the prototype's properties. But what if your
	map needs to include the word "hasOwnProperty"? You won't be able
	to call that method anymore becuase the object's own property hides
	the method value.

	Can you think of a way to call hasOwnProperty on an object that has 
	its own property by that name?

        Solution:

        * Use the form Object.prototype.hasOwnProperty.call(<obj>, <property>)
	in order to call the hasOwnProperty method from the base object. 
*/

let obj = {"hasOwnProperty": "I'm here!", "hello": 'world'};

console.log("Should output I'm here!:", obj.hasOwnProperty);

// if you called the above as a function it would throw an error 
// because hasOwnProperty is not a function since Object.prototype.hasOwnProperty
// has been overwritten. (Uncomment out console.log below for proof.)

// console.log('Should throw error:', obj.hasOwnProperty("hello"));

console.log("Should output true:", Object.prototype.hasOwnProperty.call(obj, 'hello'));
