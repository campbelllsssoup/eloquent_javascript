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
    this.size = 0;
  }

  add(val) {
    if (this.hasOwnProperty(val)) {
      console.log('value already added to set!');
      return this;
    } else {
      console.log('adding new value...');
      this[val] = val;
      this.size++;
      return this;
    }
  }

  delete(val) {
    if (this.hasOwnProperty(val)) {
      console.log('Deleting value...');
      delete this[val]
      this.size--;
      console.log(this);
      return this;
    } else {
      console.log("That value isn't in this set!");
      return this;
    }
  }

  has(val) {
    if (this.hasOwnProperty(val)) {
      return true;
    } else {
      return false;
    }
  }

}

let newGroup = new Group();

newGroup = newGroup.add(1);
newGroup = newGroup.add(8);
newGroup = newGroup.add(7);
newGroup = newGroup.delete(7);
console.log('Size should be 2:', newGroup.size);
