// Exercise 12-2: Closure : DONE!!!

/*
  The way we have defined fun allows functions in Egg to reference the
  surrounding scope, allowing the function's body to use local values that were
  visible at the time the function was defined, just like Javascript functions
  do. 

  The following program illustrates this: function f returns a function that
  adds its argument to f's argument, meaning that it needs access to the local 
  scope inside f to be able to use binding a.

  Go back to the definition of the fun form and explain which mechanism causes
  this to work.
*/

let { topScope, run } = require('./12_language.js');

run(`
do(define(f, fun(a, fun(b, +(a,b)))),
  print(f(4)(5)))
`)
 //=> 9



/*
  "fun" factory function
*/

specialForms.fun = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError("Functions need a body");
  }
  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map(expr => {
    if (expr.type != "word") {
      throw new SyntaxError("Parameter names must be words");
    }
    return expr.name;
  });

  return function() {
    if (arguments.length != params.length) {
      throw new TypeError("Wrong number of arguments");
    }
    let localScope = Object.create(scope);
    for (let i = 0; i < arguments.length; i++) {
      localScope[params[i]] = arguments[i];
    }
    return evaluate(body, localScope);
  };
};

/*
  On line 47 we create a new copy of the scope object that was passed into this 
  function. On lines 48-50, we're adding all of the function's parameters to the 
  local scope.
  
  Following that we make a call to evaluate, PASSING IN THE
  NEW localScope WE JUST POPULATED WITH PARAMS. This is what allows our functions
  to remember the localScope that existed when the function was defined.
*/