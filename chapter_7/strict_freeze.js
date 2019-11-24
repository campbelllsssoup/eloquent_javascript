// 'use strict'

let object = Object.freeze({value: 5});
// in strict mode the below will throw an error, normally it will be ignored
object.value = 15;

console.log(object.value);
