// Exercise 11-1: Tracking the Scalpel : NOT DONE...

/*
  The village crows own an old scalpel that they occasionally use on special 
  missions—say, to cut through screen doors or packaging. To be able to quickly 
  track it down, every time the scalpel is moved to another nest, an entry is 
  added to the storage of both the nest that had it and the nest that took it, 
  under the name "scalpel", with its new location as the value.

  This means that finding the scalpel is a matter of following the breadcrumb 
  trail of storage entries, until you find a nest where that points at the nest 
  itself.

  1) Write an async function locateScalpel that does this, starting at the nest 
  on which it runs. You can use the anyStorage function defined earlier to 
  access storage in arbitrary nests. The scalpel has been going around long 
  enough that you may assume that every nest has a "scalpel" entry in its data 
  storage.

  2) Next, write the same function again without using async and await.

  Do request failures properly show up as rejections of the returned promise in 
  both versions? How?
*/

let { anyStorage, storage } = require('./notes.js');
let { bigOak, nodes } = require('./crow-tech.js');

/*
  async / await solution
*/

// async function locateScalpel(nest) {
//   let current = nest;
//   let next = await storage(nest, 'scalpel'); //=> "Gilles' Garden"
//   while (current.name != next) {
//     oldCurrent = current;
//     current = nodes[next];
//     //console.log(typeof current); //=> node
//     next = await anyStorage(oldCurrent, next, 'scalpel'); //=> 'Woods'
//   }
//   return current.name;
// }

// locateScalpel(bigOak).then(console.log); //=> 'Butcher Shop'


/*
  Non async/await solution.

  Recursion is a life saver.
*/

function locateScalpel(nest) {
  return storage(nest, 'scalpel').then(next => {
    if (next == nest.name) return nest.name;
    return locateScalpel(nodes[next]);
  })
}

locateScalpel(bigOak).then(console.log); //=> 'Butcher Shop'