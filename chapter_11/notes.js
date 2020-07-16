// Chapter 11 Notes - Asynchronous Programming
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

function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result));
  });
}

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


/*
  Mapping out nodes in a network
*/

requestType('connections', (nest, {name, neighbors}, source) => {
  let connections = nest.state.connections;
  if (JSON.stringify(connections.get(name)) == JSON.stringify(neighbors)) return;
  connections.set(name, neighbors);
  broadcastConnections(nest, name, source);
})

const broadcastConnections = (nest, name, exceptFor = null) => {
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, 'connections', { 
      name, 
      neighbors: nest.state.connections.get(name) 
    })
  }
}

everywhere(nest => {
  nest.state.connections = new Map;
  nest.state.connections.set(nest.name, nest.neighbors);
  broadcastConnections(nest, nest.name);
})

/*
  Finding a path to a node in a network
*/

const findRoute = (from, to, connections) => {
  let work = [{at: from, via: null}];
  for (let i = 0; i < work.length; i++) {
    let {at, via} = work[i];
    for (let next of connections.get(at) || []) {
      if (next == to) return via;
      if (!work.some(w => w.at == next)) {
        work.push({at: next, via: via || next})
      }
    }
  }
  return null;
}

/*
  Sending a message to another node
*/

const routeRequest = (nest, target, type, content) => {
  if (nest.neighbors.includes(target)) {
    return request(nest, target, type, content);
  } else {
    let via = findRoute(nest.name, target, nest.state.connections);
    if (!via) throw new Error(`No route to ${target}`);
    return request(nest, via, 'route', {target, type, content});
  }
}

requestType('route', (nest, {target, type, content}) => {
  return routeRequest(nest, target, type, content);
})

/*
  Accessing information stored across nodes

  note: the info may or may not be in any given node.
*/

requestType('storage', (nest, name) => storage(nest, name))

const network = (nest) => {
  return Array.from(nest.state.connections.keys());
}

const findInRemoteStorage = (nest, name) => {
  let sources = network(nest).filter(n => n != nest.name);
  const next = () => {
    if (sources.length == 0) {
      return Promise.reject(new Error("Not found"));
    } else {
      let source = sources[Math.floor(Math.random() * sources.length)];
      sources = sources.filter(n => n != source);
      return routeRequest(nest, source, 'storage', name)
        .then(value => value != null ? value : next(), next);
    }
  }
  return next;
}

// const findInStorage = (nest, name) => {
//   return storage(nest, name)
//           .then(found => {
//             if (found != null) return found;
//             else return findInRemoteStorage(nest, name);
//           });
// }




/*
  findInStorage async re-write
*/

const findInStorage = async(nest, name) => {
  let local = await storage(nest, name);
  if (local != null) return local;

  let source = network(nest).filter(n => n != nest.name);
  while (sources.length > 0) {
    let source = sources[Math.floor(Math.random() * sources.length)];
    sources = sources.filter(n => n != source);
    try {
      let found = await routeRequest(nest, source, 'storage', name);
      if (found != null) return found;
    } catch(_) {}
  }
  throw new Error("Not found");
}

/*
  Generator functions
*/

// function* powers(n) {
//   for (let current = n;; current *= n) {
//     yield current;
//   }
// }

// for (let power of powers(3)) {
//   if (power > 50) break;
//   console.log(power);
// }

/*
  The Event Loop

  You won't be able to catch errors of asynchronous code using the below pattern.
  This is because by the time the Error is thrown, the try-catch block has already
  run it's course.
*/

// try {
//   setTimeout(() => { throw new Error("Woosh");}, 20);
// } catch(_) {
//   console.log('Will this run?');
// }
//=> Error: Woosh

/*
  The JS environment can only run one program at a time, and all asynchronous
  callbacks get executed in the order they were added to the event loop.

  The event loop is how we're actually allowed to simulate asynchronicity.

  It's common to say that things run 'in the background' when we are describing
  asynchronous programming in JS, but in truth we can think of these things being
  'set in motion' instead of 'running', since JS only 'runs' one program at a time.
*/

/*
  Slow running code may delay the handling of other events due to the above
  facts.
*/

// let start = Date.now();
// setTimeout(() => {
//   console.log("Timeout ran at", Date.now() - start);
// }, 20);
// while (Date.now() < start + 50) {} // slow running code
// console.log("Wasted time until", Date.now() - start);

// => Wasted time until 50ms elapsed
// => Timeout ran at 55ms elapsed


/* 
  That timeout was supposed to run its' block of code @ 20ms elapsed, but it 
  executed after the script finished, causing an inaccurate timeout. 
*/

/*
  Promises always reject or resolve as an event. Therefore, they are added to 
  the event/callback queue just the same as any other asynchronous action, and
  are executed only after the current script finishes.

  We could say the asynchronous code runs after the current script finishes, 
  or when the stack is clear of any frames.
*/

// Promise.resolve("Done").then(console.log);
// console.log('Me first!');

// => Me first!
// => "Done"

/*
  The below will return only one line of results.
  See book for details on why this happens.
*/  

function anyStorage(nest, source, name) {
  if (source == nest.name) return storage(nest, name);
  else return routeRequest(nest, source, 'storage', name);
}

// async function chicks(nest, year) {
//   let list = '';
//   await Promise.all(network(nest).map(async name => {
//     list += `${name}: ${await anyStorage(nest, name, `chicks in ${year}`)}\n`;
//   }));
//   return list;
// }

/*
  The below code is the proper way to handle the chicks function so that you 
  get the results of all nests.

  These last two sections deal with how to handle asynchronous gaps, like the
  one that occurs in the first example. 
*/

async function chicks(nest, year) {
  let lines = network(nest).map(async name => {
    return `${name}: ${await anyStorage(nest, name, `chicks in ${year}`)}`;
  });
  return (await Promise.all(lines)).join("\n");
}

chicks(bigOak, 2017).then(console.log); // => Big Oak: 1

module.exports = { anyStorage, storage };