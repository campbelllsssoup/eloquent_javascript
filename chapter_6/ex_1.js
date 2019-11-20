// Exercise 6-1: A Vector Type : DONE!!!

/*
	Write a class Vec that represents a vector in two-dimensional space. It takes x and y parameters
	(numbers), which it should save to properties of the same name.

	Give the Vec prototype two methods, plus and minus, that take another vector as a parameter and 
	return a new vector that has the sum or difference of the two vectors' (this and parameters) x
	and y values.

	Add a getter property length to the prototype that computes the length of the vector - that is,
	the distance of the point (x,y) from the origin (0,0).

        PSEUDO-CODE:

	This problem is pretty self-explanatory, but I could explain how the getter property 'length'
	will work.

	For the length property, we will use the Pythagorean Theorem to get the distance between the
	point's distance and the origin. The Pythagorean Theorem is relatively simple - the formula 
	is a^2 + b^2 = c^2. We already have a and b (a being the x distance between the two points
	and b being the y distance between the points), so if we obtain the square root of these 
	two distance's sum, we should get the distance between the two points.
*/	

/* NOT USING 'new' keyword:

function makeVec(x,y) {
    let instance = Object.create({})
    instance.x = x;
    instance.y = y;
    return instance;
}

makeVec.prototype.plus = function plus(vec){
  let x, y;
  x = this.x + vec.x;
  y = this.y + vec.y;
  return makeVec(x,y);
}

makeVec.prototype.plus = function plus(vec){
  let x, y;
  x = this.x - vec.x;
  y = this.y - vec.y;
  return makeVec(x,y);
}

Object.defineProperty(makeVec.prototype, 'length', {
  get: function length(){
    return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
  }
})

// PRE-ES6 SYNTAX:

function Vec(x,y) {
    this.x = x;
    this.y = y;
}

Vec.prototype.plus = function plus(vec){
  let x, y;
  x = this.x + vec.x;
  y = this.y + vec.y;
  return new Vec(x,y);
}

Vec.prototype.plus = function plus(vec){
  let x, y;
  x = this.x - vec.x;
  y = this.y - vec.y;
  return new Vec(x,y);
}

Object.defineProperty(Vec.prototype, 'length', {
  get: function length(){
    return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
  }
})

*/

// ES6+ SYNTAX

class Vec{

  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  plus(vec) {
    let x, y;
    x = this.x + vec.x;
    y = this.y + vec.y;
    return new Vec(x,y);
  }

  minus(vec) {
    let x, y;
    x = this.x - vec.x;
    y = this.y - vec.y;
    return new Vec(x,y);
  }


  get length(){
    return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
  }

}

let vec1 = new Vec(3,4);
let vec2 = new Vec(5,4);

console.log(vec1);
console.log(vec2.length);

