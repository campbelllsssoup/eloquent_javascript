
// Exercise 7-3: Persistent Group : DONE!!!

/*
        Most data structures provided in a standard Javascript environment
        aren't very well suited for persistent use. Arrays have slice and 
        concat methods, which allow us to easily create new arrays without
        damaging the old one. But Set, for example, has no methods for 
        creating a new set with an item added or removed. 
        
        Write a new class PGroup, similar to the Group class from "Groups"
        on page 113, which stores a set of values. Like Group, it has add,
        delete, and has methods.
        
        Its add method, however, should return a new PGroup instance with
        the given member added and leave the old one unchanged. Similarly,
        delete creates a new instance without a given member.

        The class should work for values of any type, not just strings. It
        does not have to be efficient when used with large amounts of values.
        
        The constructor shouldn't be part of the class's interface (though
        you'll definitely want to use it internally). Instead there is an 
        empty instance, PGroup.empty, that can be used as a starting value.
        
        Why do you need only one PGroup.empty value, rather than having a 
        function that creates a new, empty map every time?
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


// Make the below class Persistent / Immutable

class PGroup {

  constructor() {
    this.values = [];
    this.size = 0;
  }
  
  static empty = PGroup.from([]);

  add(val) {
    if (this.values.indexOf(val) !== -1) {
      return this; // fine to return this because object hasn't been mutated
    } else {
      let newGroup = PGroup.from(this.values);
      newGroup.values.push(val);
      newGroup.size++;
      return newGroup;
    }
  }

  delete(val) {
    let valIndex = this.values.indexOf(val);
    if (valIndex !== -1) {
      let newValues = this.values.splice(valIndex, 1);
      let newGroup = PGroup.from(newValues);
      return newGroup;
    } else {
      return this; // fine to return this because object hasn't been mutated
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
    let newGroup = new PGroup();
    let currentStep = iterator.next();
    let values = [];
    while (currentStep.done === false) {
      values.push(currentStep.value);
      currentStep = iterator.next();
    }
    newGroup.values = values;
    newGroup.size = values.length;
    return newGroup;
  }

}

// console.log('Empty Group:', PGroup.empty); // WORKS!

// console.log('New group from 1,2,3 :', PGroup.from([1,2,3])); // WORKS!

let firstGroup = PGroup.from([1,2,3]);

let secondGroup = firstGroup.add(4);

// console.log(firstGroup); 
// console.log(secondGroup); // firstGroup is not mutated because of the .add method
let thirdGroup = firstGroup.add(4);

// console.log(secondGroup === thirdGroup); // secondGroup is not equal to thirdGroup even though they have the same values





