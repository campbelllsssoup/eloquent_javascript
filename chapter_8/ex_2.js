// Exercise 8-2: The Locked Box : DONE!!!

/*
    Consider the following (rather contrived) object:
----------------------------------------------------------
  const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
      if (this.locked) throw new Error("Locked!");
      return this._content;
    }
  }
----------------------------------------------------------
    It is a box with a lock. There is an array in the box,
    but you can get at it only when the box is unlocked. 
    Directly accessing the private _content property is 
    forbidden.

    Write a function called 'withBoxUnlocked' that takes a
    function value as an argument, unlocks the box, runs the
    function, and then ensures that the box is locked again 
    before returning, regardless of whether the argument 
    function returned normally or threw an exception.

    For extra points, make sure that if you call withBoxUnlocked
    when the box is already unlocked, the box stays unlocked.
*/

const box = {
  locked: true, // the bonus works as expected when this property is set to false.
  unlock() { this.locked = false; },
  lock() { this.locked = true; },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content; // allows you to access the _content property
    // after you call this get method - get methods are called without
    // parantheses. They manifest themselves much like normal properties.
  }
}

function withBoxUnlocked(action) {
  let intiallyLocked = box.locked;
  if (intiallyLocked === true) {
    box.unlock();
    action();
    box.lock();
  } else {
    action();
  }
}

withBoxUnlocked(function(){
  box.content.push("gold piece");
})

let isInitiallyLocked = box.locked;
try {
  console.log('Initial locked state:', box.locked);
  withBoxUnlocked(function(){
    throw new Error("Pirates on the horizon! Abort!");
  }, box);
} catch(e) {
  console.log("Error raised:", e);
} finally {
  console.log(box.content); // should output ['gold piece']
  if (isInitiallyLocked === true){
    box.lock(); // if the box is initially locked, lock it back.
  }
  console.log('Is box locked at end?:', box.locked);
}

// The above logic works.
