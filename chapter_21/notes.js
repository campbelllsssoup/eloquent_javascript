// Chapter 21 Notes - Skill-Sharing Website
// Start time: 1243h 8-7-20
// End time: 2040h 8-8-20


/*
  Long Polling

  While building this app, we're going to implemenet 'real-time' messaging 
  functionality by utilizing a technique called Long Polling.

  We need this real-time capability because we want to always see the most
  up to date information concerning the talks being proposed and the comments
  related to each talk proposal.

  The way long polling works is a client will send a 'polling request' to the
  server. This request contains a header that tells the server how long the 
  client will wait for a response. The request will idle until one of two things 
  happen: 

  1) Someone proposes a new talk or comment.

  2) The request times out.

  If outcome 1 happens, the server will send the new information to the client,
  the client will process it, and then send another polling request.
  
  If outcome 2 happens, the server will send a response that contains no new 
  info and the client sends another polling request.


  Periodically sending the update requests has other benefits - it allows a 
  client to recoup after losing connection with the server & it allows 
  reconnections after server-side failures.
*/

/*
  HTTP Interface

  - Assets will be served from the root URL '/'
  - Server interaction will occur from the '/talks' path

  ----------------
  Talk controller
  ----------------
    Index
      GET /talks
      
    Create / Update
      PUT /talks/<title>
      body: {
        presenter,
        summary
      }

    Show
      GET /talks/<title>

    Destroy
      DELETE /talks/<title>

    add_comment
      POST /talks/<title>/comments
      body: {
        author,
        message
      }

  * we need to use encodeURIComponent in order to encode titles since they'll 
  likely contain spaces and other special characters
*/

/*
  HTTP Interface - In support of Long Polling


  In order to support long polling in our HTTP interface, we're going to use a 
  send a couple of headers along with each client request to /talks. These
  headers will tell the server what version of the data we have, and 
  how long we're willing to wait for the next update.

  Below in the prefer header, the wait time is measured in seconds & the 
  eTag is originally sent by the server on the first response.

  --------
  Client
  --------
  If-None-Match: <eTag string>
  Prefer: wait=90


  On the server-side, we're also going to send a few headers along that inform
  the client of which version of the data we're dealing with (ETag) and the
  client will store this as the current version of the data, sending it back
  to the server in it's If-None-Match header.

  --------
  Server
  --------
  ETag: <eTag string>

*/


/*
  The Server - Routing

  In order to differentiate between different requests (by reading the 
  request's path and method properties) we can use what's known as a router. A
  router uses regular expressions to match a request's path and method to a 
  specific controller action (a.k.a. handler function).

  See './codealong_skillsharing/router.js' to check out the router class we'll
  be using.

  Note that the 'context' variable is the actual server object created by the
  createServer method.
*/


/*
  Serving Files


  Router returns the correct handler function or null if the request was 
  incorrect.

  Handlers return promises that resolve to objects describing the response.

  The servers state consists of the talk objects, the version, and the 
  subscriber list.

  the ecstatic npm package is a minimalistic file server application used here.
*/


/*
  Talks As Resources

  The talks property holds an array of talk objects. The keys are the talk's 
  name, and it's value the response content.
*/


/*
  Long Polling Support

  See the code @ codealong_skillsharing/index.js
*/


/*
  The Client - HTML

  The client-side has 3 components: an HTML page, stylesheet and a script

  The widespread convention for homepage creation is to create a file named
  index.html under the root directory of the location you're serving
  views from (in our case in the <app_name>/public folder). This is true for
  all requests made to URL's that resolve to directories.
  
*/


/*
  Actions

  The application state is as follows:

  talks <array>
  user <string>

  The application may not directly alter the state or send HTTP requests.
  Instead, it emits actions that describe what the user is trying to do.

  This action emitting works just like the Redux flow. We have a central state
  architecture, and in order to change the state we must dispatch actions to our
  store (central state). This action is thereby received by a reducer, fed along
  with our currentState, and we reduce the action and the current state to a
  new state object, or return the current state if that's what the situation 
  requires.

  The Redux pattern utilizes tenets of the functional programming paradigm (
  namely immutability in regards to state changes, using reducing functions), 
  and reactive programming paradigm (programming that relies on events instead 
  of the order of the lines of code).

  
  fetchOK guaruntees that if a request to a server returns an HTTP status code 
  within the 4** or 5** classes, that it will result in an error being thrown. 
  Normally this doesn't happen when we use fetch, the erroneous status code is
  contained within the promise returned by fetch instead.

*/



/*
  Rendering Components

  We'll use the elt function from Chapter 19 in order to render our components.

  HTMLFormElement#reset - restores a form element's default values

  "There's a widely used JS extension named JSX that lets you write HTML 
  directly in your scripts, which can make such code prettier. Before you can 
  actually run such code, you have to run a program on your script to convert 
  the pseudo-HTML into JavaScript function calls much like the ones we use here
  (in our front-end script)."
  
*/


/*
  Polling

  We'll send along the ETag with each request in the if-none-match header (and 
  our Prefer header w/ wait time) so that the server knows what version of the 
  data we have - we'll store this value on the initial load of the webpage.

  We'll create a function that handles the initial load along with the 
  continuous polling of the server.

  See #pollTalks function for a look at how long polling is handled.


*/