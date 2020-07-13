/*
  Helper functions: 
  anyStorage(0),
  routeRequest, storage (1), 
  request, findRoute, readStorage (2)

  function anyStorage(nest, source, name) {
    if (source == nest.name) return storage(nest, name);
    else return routeRequest(nest, source, 'storage', name);
  }

  function storage(nest, name) {
    return new Promise(resolve => {
      nest.readStorage(name, result => resolve(result));
    });
  }

  Node#
  readStorage(name, callback) {
    let value = this[$storage][name]
    setTimeout(() => callback(value && JSON.parse(value)), 20)
  }

  function routeRequest(nest, target, type, content) {
    if (nest.neighbors.includes(target)) {
      return request(nest, target, type, content);
    } else {
      let via = findRoute(nest.name, target, nest.state.connections);
      if (!via) throw new Error(`No route to ${target}`);
      return request(nest, via, 'route', {target, type, content});
    }
  }

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

  function findRoute(from, to, connections) {
    let work = [{at: from, via: null}];
    for (let i = 0; i < work.length; i++) {
      let {at, via} = work[i];
      for (let next of connections.get(at) || []) {
        if (next == to) return via;
        if (!work.some(w => w.at == next)) {
          work.push({at: next, via: via || next});
        }
      }
    }
    return null;
  }
*/