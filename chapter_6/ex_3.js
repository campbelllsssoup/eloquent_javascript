// Exercise 6-3: Iterable Groups : DONE!!!
let groupClass = require('./ex_2.js');
let Group = groupClass.Group;
/*
	Make the group class from the previous exercise iterable. Refer to
	the section about the iterator interface earlier in the chapter if
	you aren't clear on the exact form of the interface anymore.

	(Review book and look over MDN docs on Iterator interface.)

	If you used an array to represent the group's members, don't just
	return the iterator created by calling the Symbol.iterator method
	on the array. That would work, but it defeats the purpose of this
	exercise.
	
	It is okay if your iterator behaves strangely when the group is 
	modified during iteration.
*/


// import works, make Group class iterable

Group.prototype[Symbol.iterator] = function*() {
  let values = this.values;
    for(let key of values) {
      console.log(key)
    }
}

let newGroup = Group.from([4,5,6]);

for(let val of newGroup){
  console.log(val);
}

