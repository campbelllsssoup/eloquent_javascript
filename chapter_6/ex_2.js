// Exercise 6-2: Groups : DONE!!!

/*

	The standard JavaScript environment provides another data structure called
	Set. Like an instance of Map, a set holds a collection of variables. Unlike
	Map, it does not associate other values with those - it just tracks which 
	values are part of the set. A value can be part of a set only once - adding
	it again doesn't have any effect.

	Write a class called Group (since Set is already taken). Like Set, it has add,
	delete, and has methods. Its constructor creates an empty group, add adds a 
	value to the group (but only if it isn't already a member), delete removes its
	argument from the group (if it was a member), and has returns a Boolean value
	indicating whether its argument is a member of the group.

	Use the === operator, or something equivalent such as indexOf, to determine
	whether two values are the same.

	Give the class a static from method that takes an iterable object as an argument
	and creates a group that contains all the values produced by iterating over it.


*/

class Group {

  constructor() {
    this.values = [];
    this.size = 0;
  }

  add(val) {
    if (this.values.indexOf(val) !== -1) {
      return this;
    } else {
      this.values.push(val);
      this.size++;
      return this;
    }
  }

  delete(val) {
    let valIndex = this.values.indexOf(val);
    if (valIndex !== -1) {
      this.values.splice(valIndex, 1);
      this.size--;
      return this;
    } else {
      return this;
    }
  }

  has(val) {
    if (this.values.indexOf(val) === -1) {
      return false;
    } else {
      return true;
    }
  }

  static from(iterable) {
    if (!iterable[Symbol.iterator]) return undefined;
    let iterator = iterable[Symbol.iterator]();
    let newGroup = new Group();
    let currentStep = iterator.next();
    while (currentStep.done == false) {
      newGroup.add(currentStep.value);
      currentStep = iterator.next();     
    }
    return newGroup;
  }

}

/*
let newGroup = new Group();

newGroup = newGroup.add(1);
newGroup = newGroup.add(8);
newGroup = newGroup.add(7);
console.log('Should return true', newGroup, newGroup.has(7));
newGroup = newGroup.delete(7);
console.log('Should return false', newGroup, newGroup.has(7));

console.log('Size should be 2:', newGroup.size);
*/

//console.log(Group.from([1,2,3]));

exports.Group = Group;
