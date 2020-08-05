// Chapter 20 Notes - Node.js
// Start time: 1833h 8-3-20
// End time: 2108 8-4-20

/*
  The Node Command


  The node bash command allows us to execute javascript programs in the terminal
  (similar to the ruby and bash commands).

  Running node without a file as an argument opens up a REPL environment.

  The process binding provided by Node gives us ways to inspect and manipulate
  the current program:

  - We can exit out of the node program by calling the 'process#exit' method. 
  Typically when you use this method, you provide an exit status code as an 
  argument. 0 means that the program completed without issue, and any other
  code indicates that an error occurred during execution.
  
  - 'process#argv' allows us to read the command line arguments that were 
  provided when we initiated the node program. See below:

  -----------------------------------------------------------------------------

  $ node showargv.js one --and two
  => ["node", "/tmp/showargv.js", "one", "--and", "two"]

  -----------------------------------------------------------------------------

  All standard JS bindings are available in Node also, while browser-based 
  bindings (document, prompt) are not.

*/

/*
  Modules


  Node.js uses a CommonJS-based system to load modules (as opposed to ESmodules).
  We load these modules by calling the require method with the desired module
  provided as an argument. You must make sure that this module / package has
  been either installed globally on your computer (least recommended) or 
  included in your package.json file as a project dependency (highly recommend).

  The require method can be used to load built-in and external modules or files 
  that are part of our program. The string provided for requiring files within
  our system work the same as navigating the linux system. 

  ./file.js = look for 'file.js' in the current directory and load it.

  ../file.js = look for 'file.js' one directory up from the current directory
  and load it.

  /file.js = look for 'file.js' in the root directory of the file system.

  NOTE: the .js extension may be omitted. If the path refers to a directory
  Node will try to load a file named 'index.js' within that directory.

  If the string provided to the require method isn't a path, Node will search
  for the module in the node_modules directory.

*/


/*
  Installing with NPM + Package Files


  NPM is an online repository fo JavaScript modules. When you install Node on 
  your computer, it also installs the npm command. This command allows us to 
  interact with NPM and upload or download packages.

  Installing packages is simple, just run something like the following:

  npm install <package_name>
  npm install ini

  First, initialize a node project by running 'npm init' - this will ask you a
  few questions about your project like the source repository, name of the
  project, etc. After filling this out, and running '$ npm install <package>', a
  few changes will occur.

  First, the ini package will be added as a dependency to your package.json
  and package-lock.json files. Both of these files describe your project and it's
  dependencies so that you can simply handoff your source code to another and 
  all that they have to do is run '$ npm install' in order to download the 
  necessary dependencies.

  By default, npm will store the source code of the package you've installed in
  the node_modules folder. This is the same folder that Node looks for required
  packages in.

*/


/*
  Versions


  The package.json file lists our program's own version and the version of each
  dependency. NPM follows a convention called 'semantic versioning' - it is a
  standard for encoding information about breaking changes, 
  bug fixes / minor patches, and new functionality.

  A semantic version consists of three numbers separated by periods (ex: 2.3.0).
  Every time new functionality is added the middle number is incremented, when
  compatability is broken (breaking changes) the first number is incremented.
  The last number indicated bug fixes or minor updates.

  A caret in front of the version number means that any version compatible with
  the version number is acceptable to install.

  Running 'npm publish' publishes your project to the npm registry - assuming
  there isn't another package out there with the same name as yours. Yarn is 
  an alternative to using npm - it was created by a few companies (Facebook,
  Exponent, Google, and Tilde) to solve issues they were having with the npm 
  package manager.

  Pros:

  - Caches all installed packages.
  - Simultaneously installs packages, which makes installing packages faster.
  - Locks down versions of package's dependencies by default.

*/

/*
  The File System Module


  One of the most commonly used built-in modules in Node is the fs (file system)
  module. It exposes functions that allow us to work with files and directories
  within our file system (did the name give it away? :D ).
  
  #readFile - reads a file and then calls a callback with the file's contents.

  #readFile(<file_path>, <encoding>, <callback func(err, result)>)

  See Example 1.

  In example 1, we provide utf8 as the character encoding for the file we're 
  reading - this is what is used for normal text. If you omit the second argument,
  Node will assume that you want to read binary data and will produce a Buffer 
  object instead of a normal human-readable string.

  Buffers are array-like objects that contain numbers representing the bytes in
  the files.

  Another function, #writeFile, allows us to write a file to the disk.

  #writeFile(<file_path>, <data>, <callback_func(err)>)

  See Example 2.

  When writing to the disk, providing a character encoding is not necessary - 
  Node will determine this based off of the datatype of the data is is given
  (binary for Buffer objects, UTF-8 for strings).

  the fs module contains other helpful functions:

  - readdir, returns the files in a directory as an array of strings.

  - stat, retrieves information about a file

  - rename, renames a file

  - unlink, removes a file

  - and others (see https://nodejs.org for a comprehensive list)

  
  Most of these functions take a callback function as the last argument, where
  the first parameter of the callback is an error and the second is the result.

  Since the callback style of async programming is somewhat difficult to manage
  (more complicated error handling, callback hell), the creators of Node have
  built a promise based way of handling asynchronicity. We can do this by
  accessing the promises property of the 'fs' export object.

  See Example 3.

  There are times when you don't want to read / write files asynchronously - if
  you ever find yourself in this predicament, there are 'Sync' versions of most
  of the 'fs' functions. One of these is '#readFileSync'.

  See Example 4.

  The downside to writing your programs with this synchronous behavior is that
  while we're reading from the target file, the program halts and handles only
  the reading of the file. If you're building a server using Node - this is 
  highly discouraged because it will lead to an increase in latency.
*/


/*
  The HTTP Module


  The 'http' module gives us functions that enable us to build web servers.

  See Example 5.

  The createServer function takes a callback function as an argument - you can
  think of this as the 'main controller' of your application. The callback
  takes a request and response as arguments, each with their own methods and
  properties, and is called everytime the server receives a request.

--------------------------------------------------------------------------------

  Response:
    #writeHead<header_obj> - write to the header of the response
    #write<body_data> - write to the body of the response.
    #end - ends the response

  Request:
    .url - returns the path of the request
    .method - returns the method of the request

  Server:
    #listen(<port>) - starts the server, it will listen for requests on the
    specified port

--------------------------------------------------------------------------------

  A script that listens for requests will not automatically terminate. Exit
  the process with CMD+C for Mac (CTRL+C for Windows).

  Not only can we listen for requests, we can also send them by using the 
  #request method.

  See Example 6.

  Calling the request method begins a #request, you may end the request with 
  the #end method. The first argument to #request is a config object - here
  you must specify the hostname, path, method, and any necessary headers. The
  second argument is a callback function that will be invoked after a response
  is received.

  The object returned by #request allows us to stream data into the request with
  the #write method (for POST, PUT, PATCH) and finish the request with the #end 
  method.

  In order to make requests using HTTPS, load the request method from the 'https'
  module. Since making requests is verbose, there are wrapper packages out there to 
  make the process cleaner (ex: node-fetch).

*/


/*  
  Streams


  We've already seen two types of writable streams, the requestStream returned
  by calling the #request method and the response object that the server writes
  to.

  WritableStreams have a #write method that can be passed a string or Buffer 
  object, this value is then written to the stream. The #end method closes the
  stream and will write a value at the end of the stream if given one. Both
  of these methods also accept an optional callback as the last argument, which
  will be called after the action has finished.

  We can create a WritableStream that points to a file with the 
  #createWriteStream function from the 'fs' module - by calling #write on this
  object we can write to the file piece by piece.

  Both the request and response bindings we've seen earlier are ReadableStreams.
  Reading from streams are done by utilizing event handlers rather than methods.

  Objects that emit events have a method called #on that behaves very similarly
  to #addEventListener. You provide an event name and callback, adn it will 
  register that function to be evoked whenever the given event occurs.

  "ReadableStreams have an 'end' event vs. a WritableStream's 'finish' event?"

  Readable streams have 'data' and 'end' events - 'data' events are emitted 
  whenever a new piece of data has arrived and 'end' events after transmission
  has ended. This model works well for streaming data that can be immediately
  processed (think streaming films), even when the whole document isn't yet
  available. 
  
  A file can be read as a readable stream by calling the #createReadStream 
  function from the 'fs' module.

  See Example 7.

  Example 7 builds a server that reads the request stream, converts the binary 
  code to an uppercase UTF-8 string, and writes that string to the response's 
  body. After the request is finished sending data, we end the response body and 
  send the response along.

  See Example 8.

  While the server from Example 7 is running, run Example 8. This will write to
  the requestStream and output the response in chunks to the standard output.

  Here we use process.stdout instead of console.log because console.log starts
  a new line after each invocation - which wouldn't be preferable here since 
  that would spread the response body across many lines.
 
*/


/*
  A File Server


  We can combine the functionality of the 'fs' and 'http' modules to create a
  file server that allows remote access to a machine. 

  When we treat files as HTTP resources, we can use the GET, PUT, and DELETE
  methods to read, write, and delete files. In this case, the path of the 
  request will be the path of the file that the request refers to.

  On our server, we'll interpret the path as relative to the server's working
  directory - thus disallowing clients to traverse higher up the file tree.

  We'll build the program piece by piece, and create an object 'methods' that
  stores handlers for the different HTTP methods. Method handlers are async
  functions that receive the request object as an argument and return a promise
  that resolves to an object that describes the response.
  
  See Example 9, Part 1.

  ReadableStream#pipe(<WritableStream>) - 'pipes' the content from the 
  ReadableStream to the WritableStream.

  See Example 9, Part 2 for the code that resolves the absolute path of the 
  relative path given. It also provides a small layer of security by not
  allowing clients to request any files above the project's root directory in 
  the file tree.


  We'll set up the GET method to return a list of files when reading a directory
  and return a file's contents when reading a file. 

  In order to determine the datatype of a file's contents, we can use the 'mime'
  package. The object loaded has a getType method that, when provided a file, 
  returns the MIME type of the file.

  When a requested file doesn't exist, we should return a status code of 
  404 (not found). We can use the #stat function from the 'fs' module to check
  whether a file exists and whether it is a directory.

  See Example 9, Part 3.

  When the file doesn't exist, calling stat will throw an error with a 'code' 
  property set to "ENOENT", which means that the file couldn't be found. When 
  successful, the stat function returns a stats object, which provides us info
  about the file (.size, .mtime[modification time], etc.). By calling the 
  #isDirectory method on the stats object, we can determine whether the path
  yields a directory or a normal file.

  In the example, we used #readdir to read the array of files that are contained
  within the directory and return it to the client. For normal files we create
  a readable stream and return that as the body, along with the content type
  that the mime package deciphers.
  
  See Example 9, Part 4 to see the code for the DELETE handler.

  Trying to delete a file that isn't there returns 204 instead of 404 because
  HTTP requests should be idempotent. This means that performing the same action
  with the same payload multiple times should return the same result. If we try
  to delete a file that isn't there, our objective was achieved so we don't care
  that it wasn't there in the first place.

  See Example 9, Part 5 for the PUT request handler.


*/


/*
  cURL - a command line tool


  We can use cURL in order to make HTTP requests from the command line. We'll 
  use this to interact with our server.
  
  Flags:

  -X, lets us specify the HTTP method, if omitted the request will default to a
  GET request.

  -d, sets the value of request's body.


  See (https://www.mit.edu/afs.new/sipb/user/ssen/src/curl-7.11.1/docs/curl.html)
  for more info on cURL.
*/