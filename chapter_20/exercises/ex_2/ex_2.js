// Exercise 20-3: A Public Space on The Web : DONE!!!

/*
  Though the DELETE method in our file server is able to delete directories 
  (using rmdir), the server currently does not provide any way to create a 
  directory.

  Add support for the MKCOL method (“make collection”), which should create a 
  directory by calling mkdir from the fs module. MKCOL is not a widely used HTTP 
  method, but it does exist for this same purpose in the WebDAV standard, which 
  specifies a set of conventions on top of HTTP that make it suitable for 
  creating documents.

*/

let { methods, urlPath } = require('../../examples/example_9/example_9.js');
const { mkdir } = require('fs').promises;


methods.MKCOL = async function(request) {
  let respObj = {};
  try {
    await mkdir(urlPath(request.url), {});
  } catch (error) {
    respObj.status = 405;
    respObj.body = `${error}`;
  }
  return respObj;
}