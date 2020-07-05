// Chapter 11 Notes
let { bigOak, defineRequestType, everywhere } = require("./crow-tech");

/*
  One way to handle asynchronous actions is by using callback functions.

  A callback function is a function that's provided as an argument to 
  another function. For handling async actions we can write our outer
  function to where it calls the callback function at the end. This 
  would let us know when all of the other work is done.

  One example of this is setTimeout, which is written in that exact manner.
*/

// setTimeout(() => console.log("Tick"), 500);

/*
  The first argument is the callback function. The second argument is the delay
  measured in milliseconds. The callback gets called after a the delay.

  Sometimes you may require the ability to clear the timeout before it runs your
  callback function. In order to do that, assign the return value of setTimeout 
  to a variable. The return value of setTimeout is the "timeout's ID", provide 
  this as an argument to clearTimeout in order to, surprise, clear the timeout.
*/

// const bombTimeout = setTimeout(() => { console.log('BOOM!') }, 2000);
// console.log("Someone defuse the bomb!!!");
// clearTimeout(bombTimeout);

/*
  Below is an example of us reading from long term storage (hard drive), which 
  is an asynchronous action. One way to relate this to real world programming
  is by using the following equalities:

  bigOak = a network node / server;
  #readStorage = fs.readFile;
    arg1 - file location you want to read
    arg2 - callback function that takes in the result of reading that location
    (a list of files or the file's info) and does some work with it.
*/



// bigOak.readStorage("food caches", caches => {
//   let firstCache = caches[0];
//   bigOak.readStorage(firstCache, info => {
//     console.log(info);
//   })
// })


/*
  Calling the send method on a nest sends data from one nest to another.
  This method performs like fetch. I've drawn the following similarities:
  
  Fetch          | Send
  --------------------------------
  URL            | nest
  HTTP method    | type
  body           | content
  promise handler| callback

  In our scenario, we'll call these parameters nest, type, content, and done.
*/

// bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7PM", 
//   () => console.log("Note delivered."));

/*
  Since we want to make a 'note' type request to a specfic nest, we also have
  to create request handlers (controller actions in Rails) on each nest (server).
*/

defineRequestType('note', (nest, content, source, done) => {
  console.log(`${nest.name} received note: ${content}`);
  done();
});

/*
  An alternative to using callbacks for asynchrnous actions is to use Promises 
  instead! The Promise API provides us a way to represent future values and 
  values that have been resolved as one thing: A Promise.

  Just like promises in real life, promises in Javascript can be pending, fulfilled, 
  or rejected.

  Promises have values that can be accessed after they resolve - in order to 
  access and use these values we register a resolve handler to the promise by
  calling the then method on the promise.

  Then takes one argument of a callback function that is to be called when the 
  promise resolves. The sole parameter of the callback function is the value 
  of the resolved promise.
*/

// let fifteen = Promise.resolve(15);
// fifteen.then(value => console.log(`Got ${value}`));

/*
  Here, we created a new promise using the resolve static method, which immediately
  returns a resolved promise with the given argument as it's promise value.

  We take that promise, referenced by the variable 'fifteen', and call then on it,
  providing the callback function we want to run if the promise resolves. This
  is also called attaching a resolve handler to the promise.
*/

/*
  Here, we're going to create a new promise using the Promise constructor
  function.
*/

// function storage(nest, name) {
//   return new Promise(resolve => {
//     nest.readStorage(name, result => resolve(result));
//   });
// }

// storage(bigOak, "enemies")
//   .then(value => console.log('Got -', value.join(', ')));

/* 
  In the following code snippet, we're registering reject handlers by calling
  the catch function on a promise. Catch works similarly to then, you pass a
  callback function to catch as the sole argument.

  We can use Promise.reject in order to created an immediately rejected promise.
  This works similarly to Promise.resolve.

  Reject handlers are called whenever the promise is rejected. A promise can 
  be rejected for only a couple of reasons:

  1) you've created a new immediately rejected promise using Promise.reject or 
    Promise.prototype.constructor

  2) an exception was thrown in one of your resolve handlers.

  When a promise resolves, we get a promise value. When a promise is rejected, 
  the rejection receives a reason. The reason tells you why a Promise didn't 
  resolve. If a resolve handler throws an exception, it uses the exception that 
  was raised as the rejection's reason.
*/

// new Promise ((_, reject) => reject(new Error('fail')))
//   .then(value => console.log("Handler 1"))
//   .catch(reason => {
//     console.log('Caught failure ' + reason)
//     // causes the promise to be rejected, 'yellow' is used as the reason and the next resolve handler is skipped
//     // throw new Error('yellow'); 
//     // passes the reason to the resolve handler, resolve handler is called.
//     // return reason; 
//     return "nothing";
//   })
//   .then(value => console.log("Handler 2 " + value))

/* 
  Building a fetch-like function that times out after a few requests.
*/

class Timeout extends Error {}

function request(nest, target, type, content) {
  return new Promise ((resolve, reject) => {
    let done = false;
    function attempt(n) {
      nest.send(target, type, content, (failed, value) => {
        done = true;
        if (failed) return reject(failed);
        else return resolve(value);
      })
      setTimeout(() => {
        if (done) return;
        else if (n < 3) attempt(n + 1);
        else reject(new Timeout("Timed out"));
      }, 250);
    }
    return attempt(1);
  });
}

// console.log( request(bigOak, 'Cow Pasture', "note", "Let's caw loudly at 7PM") );


/*
  A promise-based wrapper for defineRequestType.
*/

function requestType(name, handler) {
  defineRequestType(name, (nest, content, source, callback) => {
    try {
      Promise.resolve(handler(nest, content, source))
        .then(resp => callback(null, resp))
        .catch(reason => callback(reason));
    } catch {
      callback(exception);
    }
  });
}

/* 
  Example of how to work with a collection of Promises. This function will allow
  us to see our available neighbor nodes in the network. This is very useful
  because some nodes may unexpectedly drop.
*/

requestType('ping', () => "pong");

function availableNeighbors(nest) {
  let requests = nest.neighbors.map(neighbor => {
    return request(nest, neighbor, 'ping')
      .then(() => true, () => false);
  });
  return Promise.all(requests).then(result => {
    // return nest.neighbors.filter((value) => value) works also, returns the same values :)
    return nest.neighbors.filter((_,i) => result[i]);
  });
}

/*
  An example of how to flood our crow network. Flooding could be useful for 
  important broadcasts sent out between nodes - or in our case - for gossip.
*/

everywhere(nest => { nest.state.gossip = [] });

function sendGossip(nest, message, exceptFor = null) {
  nest.state.gossip.push(message);
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, "gossip", message); // from <Nest>, to <Nest>, type <str>, content <str>
  }
}

requestType('gossip', (nest, message, source) => {
  if (nest.state.gossip.includes(message)) return;
  console.log(`${nest.name} received gossip '${message}' from ${source}`);
  sendGossip(nest, message, source);
})

