// Chapter 12 Notes - Project: A Programming Language

/* Egg Language example 

do(define(x,10),
   if(>(x,5), 
   print("large"), 
   print("small")))


'do' is our parser. It takes an arbitrary number of expressions for
arguments.

In the above example, we first define a variable / word 'x' and set it 
equal to 10. After that, we evaluate a conditional - x is greater than 5, 
so our program will print "large" to the console.

A thing to note is that all operators are functions, so they are stored as 
words also. 

------------
Syntax Tree
------------

A syntax tree is a data structure that contains all of a program's constructs.
It describes how each variable / expressions connects to create
a program's flow.

The shape of a syntax is inherently recursive because expressions contain other
expressions, which contain other expressions, which contain... (endlessly
recursive sentence :D ).

Below is an AST representation of the ">(x,5)" statement from above.

{
  type: 'apply',
  operator: {type: "word", name: ">"},
  args: [
    {type: "word", name: "x"},
    {type: "value", value: 5}
  ]
}

*/

function skipSpace(string) {
  let first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}

function parseExpression(program) {
  program = skipSpace(program);
  let match, expr;
  if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: "value", value: match[1]};
  } else if (match = /^\d+\b/.exec(program)) {
    expr = {type: "value", value: Number(match[0])}
  } else if (match = /^[^\s(),#"]+/.exec(program)) {
    expr = {type: "word", name: match[0]}
  } else {
    throw new SyntaxError("Unexpected syntax: " + program);
  }

  return parseApply(expr, program.slice(match[0].length))
} 

/* 
  The below handles constructing when the expression we're handling is an
  Application instead of a string, number, or word.

  It 
*/

function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(") {
    return {expr, rest: program};
  }

  program = skipSpace(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",") {
      program = skipSpace(program.slice(1));
    } else if (program[0] != ")") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }
  return parseApply(expr, program.slice(1));
}

function parse(program) {
  let {expr, rest} = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return expr;
}



/*
  console.log(parse("+(a,10)")); 
  
  //=> { type: 'apply',
  operator: { type: 'word', name: '+' },
  args:
   [ { type: 'word', name: 'a' }, { type: 'value', value: 10 } ] }
*/

/*
  RegExp refresher:

  /S character = non-whitespace character

  ^ anchor = 	Start of string or start of line

  * quantifier = Zero or more time this character / charset appears

  [] = character class. allows you to separate a section of matched text. Follows
  it's own set of rules for syntax inside of brackets.

  [^<charset>] = carat inside of character class,, match whatever DOESN'T equal
  charset provided.

  \d = digit character 0-9

  \b = (word boundary character) - position where one side only is an ASCII 
  letter, digit or underscore.
*/





/*
  We use the syntax trees that are generated to execute code. Our evaluator,
  when given both the AST and a scope object that associates names w/ values,
  will evaluate the expression.
*/

const specialForms = Object.create(null);

function evaluate(expr, scope) {
  if (expr.type == 'value') {
    return expr.value;
  } else if (expr.type == 'word') {
    
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      console.log(expr, scope);
      throw new ReferenceError(`Undefined binding: ${expr.name}`);
    }
  } else if (expr.type == 'apply') {
    let {operator, args} = expr;
    if (operator.type == 'word' && operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope);
    } else {
      let op = evaluate(operator, scope);
      if (typeof op == 'function') {
        return op(...args.map(arg => evaluate(arg, scope)));
      } else {
        throw new TypeError("Applying a non-function.");
      }
    }
  }
}

specialForms.if = (args, scope) => {
  if (args.length != 3) {
    throw new SyntaxError("Wrong number of args to if");
  } else if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
}

specialForms.while = (args, scope) => {
  if (args.length != 2) {
    throw new SyntaxError("Wrong number of args to while");
  }
  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }

  return false;
}

specialForms.do = (args, scope) => {
  let value = false;
  for (let arg of args) {
    value = evaluate(arg, scope);
  }
  return value;
}

specialForms.define = (args, scope) => {
  if (args.length != 2 || args[0].type != 'word') {
    throw new SyntaxError("Incorrect use of define.")
  }
  let value = evaluate(args[1], scope);
  scope[args[0]] = value;
  return value;
}


/*
  The Environment
*/

var topScope = Object.create(null);
topScope.true = true;
topScope.false = false;

let prog = parse('if(true, false, true)');

console.log(evaluate(prog, topScope)); //=> false

// Define arithmetic operators in the topScope

for (let op of ['+','-','*','/','==','<','>']) {
  topScope[op] = Function('a, b', `return a ${op} b;`);
}

// Define 'console.log' or sysout.print 

topScope.print = (expr) => {
  console.log(expr);
  return expr;
}

function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

// Throws an error for some reason. Will come back to this later.

// run(`
// do(define(total, 0), 
//    define(count, 1), 
//    while(<(count, 11), 
//     do(define(total, +(total, count)),
//       define(count, +(count, 1)))),
//    print(total))
// `);



/*
  Below, we're adding first class functions to our toolset in the Egg language.
*/

specialForms.fun = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError("Functions need a body");
  }
  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map(arg => {
    if (arg.type != 'word') {
      throw new SyntaxError("Parameter names must be words.");
    }
    return arg.name
  })

  return function() {
    if (arguments.length != params.length) {
      throw new TypeError("Wrong number of arguments.");
    }
    let localScope = Object.create(scope);
    for (let i = 0; i < arguments.length; i++) {
      localSCope[params[i]] = arguments[i];
    }
    return evaluate(body, localScope);
  }
}