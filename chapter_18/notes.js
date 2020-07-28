// Chapter 18 Notes - HTTP Forms
// Start time: 0645h 7-28-20
// End time: 1355h 7-28-20


/*
  The HTTP Protocol


  When you visit a site on the internet, let's say 
  'eloquentjavascript.net/18_http.html', the browser first runs through a
  process called Domain Name System (DNS) lookup. This means that we're taking
  the domain of the url - 'eloquentjavascript.net' - and we're going to 
  translate that easily readable address to an IP address (ex: 192.168.4.59).

  We utilize the DNS lookup process because IP addresses are quite hard to
  remember. You can think of DNS lookup as similar to a list of contacts,
  custom names are attached to IP addresses just like a person or company's name
  would be attached to a phone number in your list of contacts.
  
  If the server is found, the browser will attempt to open a TCP connection on
  port 80 - this is the default port for HTTP traffic. If the connection is 
  successful, the browser will send a request like the following:

  GET /18_http.html HTTP/1.1
  Host: eloquentjavascript.net
  User-Agent: Your browser's name

  The server will respond through the same connection, sending something similar
  to the following:

  HTTP/1.1 200 OK
  Content-Length: 65585
  Content-Type: text/html
  Last-Modified: Mon, 08 Jan 2018 10:29:45 GMT

  <!doctype html>
  ... the rest of the document

  Let's break this down a bit more.
*/


/*
  HTTP Request


  GET /18_http.html HTTP/1.1
  Host: eloquentjavascript.net
  User-Agent: Your browser's name

  The first line of this request starts with what we call the 'HTTP Method' of
  the request. We use different methods when communicating with a server to
  imply that we desire to do different types of actions. The string after our
  method is the 'resource' (info) that we're trying to access. This could be an
  HTML document, image, JSON file, or even binary-formatted strings. Here's a 
  list of commonly used methods:

  GET - tells the server we want to get a specific resource (no modifications on
  server)

  POST - we want to send information to the server (in RESTful routing practices,
  this method is used when we want to create a new resource on the server)

  PUT - used when we want to completely update / replace a resource. 

  PATCH - used to partially update a resource.

  DELETE - used to delete a specified resource.

  The last piece of info on the first line of our request is the version of the 
  HTTP protocol that we're using. You could also utilize HTTP/1.0, HTTP/2.0, or
  HTTPS. Most servers are not set up to handle all protocol types, but your
  browser will switch to using a different protocol automatically if needed.

  HTTP/2.0 is more complicated but faster than HTTP/1.1.

  The pieces after the first line are our request headers - additional pieces 
  of info that the server may need to carry out the request. One thing to note 
  is that the 'keys' of these key-value pairs are case-insensitive.
*/


/*
  HTTP Response


  HTTP/1.1 200 OK
  Content-Length: 65585
  Content-Type: text/html
  Last-Modified: Mon, 08 Jan 2018 10:29:45 GMT

  <!doctype html>
  ... the rest of the document

  The response also includes the protocol used. The second piece of info is the
  HTTP status code - this let's you know the status of the request. Here are
  the 'classes' of status codes:

  1xx - Informational
  2xx - Success
  3xx - Redirection
  4xx - Client Error (malformed request)
  5xx - Server Error

  One of the most recognizable status codes is 404 - this means the resource
  you requested could not be found. On some sites you'll see this displayed if 
  you enter the URL incorrectly.

  After the first line we have our response headers - these are similar to our
  request headers, they're just additional pieces of information that may be 
  helpful to know for displaying / using the info we received.

  After the headers, there's a blank line. This blank line separates the headers
  from the body of the response. We can send a body in a request, or receive it
  in the form of a response. You should only send a body with a request if 
  you're sending a POST or PUT request.
  
  Here, the body is the HTML document that will be displayed on our screen.
*/


/*
  Browsers and HTTP


  If we request a HTML document, and this document references other resources 
  (images, css files, js files), those auxillary resources are loaded as soon 
  as possible. The browser will make simultaneous GET requests to fetch these
  additional resources to save time.

  HTML pages may includes forms (think login / register page) also. These allow
  a user to send information to the server.

  <form method="GET" action="example/message.html">
    <p>Name: <input type="text" name="name"></p>
    <p>Message:<br><textarea name="message"></textarea></p>
    <p><button type="submit">Send</button></p>
  </form>

  See this in action in './examples/example_1.html'

  Let's break this down. On the first line, we begin the form with our opening
  form tag. It has a method attribute - this specifies what method will be used
  when we send our information along to the server. There's also the action
  attribute - this specifies the path you're trying to send this information
  to.

  The two lines below that are your form's input fields - this is where the user
  will input their information. Each of the input fields have a name attribute 
  that 'names' the information that they're sending along. Below that we have 
  the submit button that, when clicked, will send the information along to the
  server.

  The information manifests differently depending on what method is used. If we
  set our method attribute as GET (or omit it), the form info will be appended
  to the URL in the request, like such: 

  GET /example/message.html?name=Jean&message=Yes%3F HTTP/1.1

  The path section of the URL is separated from the form info by a question
  mark - this starts what's known as a query string. The query string is a set 
  of key-value pairs where the keys are the input field's names and the values
  are the content that are present in the input fields. Ampersand characters
  separate each key-value pair.

  The value of the key 'message' is actually 'Yes?' - but we can't use a ?
  character in the URL unless we're starting a query string. To get around this,
  we use what are called URL encoded strings.

  URL encoding will always be a percentage sign followed by a hexadecimal value.
  When this value is converted to a decimal it is the ASCII code of the 
  character it represents.

  Javascript make it easy for us to encode/decode our URLs through the use of
  the methods #encodeURIComponent and #decodeURIComponent.

  console.log(encodeURIComponent("Yes?"));
  // → Yes%3F
  console.log(decodeURIComponent("Yes%3F"));
  // → Yes?

  If we use the POST method instead of GET, the query string is included in the
  body of our request instead of in the URL.

  GET request should ONLY ever be used for requests that do not have side 
  effects (doesn't attempt to modify the state of the server / database), but
  only ask for information.

  Requests that modify something on the server should have a POST, PUT, PATCH,
  or DELETE method specified according to what you're trying to accomplish with
  the request.
*/


/*
  Fetch


  Javascript can also make requests by using a browser API called 'fetch'.
  Fetch utilizes promises. 

  fetch("example/data.txt").then(response => {
    console.log(response.status);
    // → 200
    console.log(response.headers.get("Content-Type"));
    // → text/plain
  });

  See './examples/example_2.html' to see this in action.

  Calling '#fetch' returns a Promise that eventually resolves to a Response object.
  The response object can tell you the status of the request, the value of
  various headers, and it also has methods that allow you to convert the body
  to javascript code that we can work with.

  The promise returned by '#fetch' resolves successfully even if our request didn't
  have a 2xx status code. It could be rejected if there is a network error or 
  if the server can't be found.

  The first argument to '#fetch' is the URL of the server you're trying to
  communicate with. When the URL doesn't include a protocol the URL is treated
  as relative to the current document. If it starts with a '/',
  then the protocol and domain name of the site you're on is prepended to the 
  string.

  To get the content of a response, you can use the 'text' method. This method
  returns a promise that resolves to a text representation of the response.

  fetch("example/data.txt")
    .then(resp => resp.text())
    .then(text => console.log(text));
  // → This is the content of data.txt

  You can also call a method #json on a response object to turn a JSON response
  to Javascript (if the body is valid JSON). If the response isn't valid JSON,
  the promise will be rejected.

  See './examples/example_3.html'

  If you don't provide a second argument to the fetch method, the browser will
  send a GET request. If you'd like to include additional headers, a body, or
  specify a different HTTP method, you'll have to include a config object as the
  second argument.

  fetch("example/data.txt", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: {
      name: 'Guy Hartgood',
      age: 23,
      occupation: 'Software Engineer'
    }
  })
    .then(resp => {
      console.log(resp.status); // → 405
    });


  If the method you've specified is not allowed, the status of the response will
  read 405.

  The browser will automatically include necessary headers such as 'Host' and 
  'User-Agent', but in many cases you may have to add additional headers for 
  authentication / authorization purposes or to specify what file type you'd 
  like to receive or are sending.
*/

/*
  HTTP Sandboxing


  In order to protect users from malicious sites, by default browsers do not 
  allow scripts to make requests to other domains. 

  An attack from a malicious site could play out like this - you visit a fake
  facebook.com and attempt to sign in. After providing your credentials, you're
  supplying not only the values entered in the form but also identifying info
  about yourself (through cookies). Instead of sending your request to 
  facebook's servers, the fake facebook site sends a request to your bank
  account's servers and tells them to transfer all of the funds in your account
  to the hacker's account.

  All scripts are executed in a 'sandbox' to attempt to provide protection from
  this type of attack. Sometimes, we must send communicate with other domains
  for valid reasons - in order to allow this the server must send a header like
  the following which tells the browser that cross site requests are okay.

  Access-Control-Allow-Origin: *
*/


/*
  Appreciating HTTP


  One way to build a system that communicates between the front-end 
  (client / browser) and back-end (server) is by organizing request-reponse 
  cycle into a 'remote procedure call' model.

  In this model, procedures (sub-routines / methods) are called on one machine
  and executed on another - yet they are modeled in a way that it is indifferent
  to the executor whether the call came from a local or remote machine.
  
  "Calling it involves making a request to the server that includes the 
  function’s name and arguments. The response to that request contains the 
  returned value."

  Another method would be to build your communication around the concept of 
  resources and HTTP (REST style for example). 

  Another approach is to build your communication around the concept of 
  resources and HTTP methods. Instead of a remote procedure called addUser, 
  you send a POST request to /users, including the new user details in the body
  and encoding it as JSON or some other format.

  That newly created resource would then be fetched by sending a GET request to
  the path '/users/:id', where ':id' is the ID of the user.

  The second approach makes it easier to take advantage of features that HTTP
  provides, such as browser caching. 
*/


/*
  Security and HTTPS


  When using public or potentially compromised Wi-Fi access points, it's 
  important to protect the data that you're sending to make sure that a hacker
  cannot read or modify the messages that are sent between you and the target
  server.

  One completely necessary first steps to protect yourself from such attacks is
  to only communicate with servers that accept messages sent using the HTTPS
  protocol. 

  When using this protocol, the browser first vertifies that the server is
  authentic by requesting a cryptographic certificate issued by a certificate
  authority. If the browser receives this certificate, then the message is 
  encrypted using SSL or TLS and sent to the target server.

  HTTPS doesn't work 100% of the time - certificates can be forged or stolen - 
  but using HTTPS on trusted sites is infinitely more secure than using plain
  HTTP.
*/


/*
  Form Fields


  All web forms consist of a form tag wrapping one or more input fields. Here
  are a few different types of input fields, created by setting the type 
  attribute of a input tag:

  text - A single-line text field
  password - Same as text but hides the text that is typed
  checkbox - An on/off switch
  radio - (Part of) a multiple-choice field
  file - Allows the user to choose a file from their computer

  Form fields don't have to reside within a form tag, though if they are outside
  of a form tag they can't be submitted normally. Sometimes, this may be desired
  if you don't need to submit the data but would like to update the page
  dynamically based on what was entered.

  Each input type has a different interface, so it's helpful to know how a 
  certain type of input field works when building a page with it.

  Multiline text fields have their own tag, <textarea>, mostly because using an 
  attribute to specify a multiline starting value would be awkward. 

  The <select> tag is used to create a field that allows the user to select 
  from a number of predefined options.

  <select>
    <option>Pancakes</option>
    <option>Pudding</option>
    <option>Ice cream</option>
  </select>

  Whenever the value of a form field changes, it will fire a 'change' event.
*/


/*
  Focus


  One unique thing about input fields is that they can get keyboard focus when
  clicked, or cycled through by pressing the 'tab' key. When activated they
  become the recipient of keyboard input.

  Certain fields have unique responses to keyboard input. Select menus will
  attempt to select the option that matches the text that the user typed, and
  responds to arrow keys by moving it's selection up and down.

  We can control focus in JS by calling the #focus and #blur methods on DOM
  elements. Also, you can check what element currently has focus by checking
  the activeElement property on the document (document.activeElement).

  See './examples/example_4.html' to see these methods in action.

  You can provide HTML elements the autofocus attribute in order to make the
  browser automatically focus on a particular element.

  You can also use the tab key to cycle through focusable elements (this in 
  highly important when building sites that are accessible for people with 
  disabilities). By assigning a number to an element's tabIndex property, we can
  control which elements pressing tab should allow us to cycle through, as well 
  as the order in which they are cycled through.

  See './examples/example_5.html'.

  Most types of HTML elements cannot be focused - but you can add that 
  capability to an element by setting a tabIndex attribute on it.

  A tabindex of -1 makes tabbing skip over an element, even if it is normally
  focusable.
*/


/*
  Disabled Fields


  Form fields can be disabled by including the 'disabled' attribute on the
  element. You do not have to set a value to the attribute.

  See './examples/example_6.html'.

  Disabled fields can't be focused or changed, and the browser will make them
  appear grey and faded.

  Whenever your site initiates a long running action by pressing a button, you
  should disable the button so that the user doesn't invoke the action a second
  time.
*/

/*
  The Form as a Whole


  When a field is located inside of a form, it's DOM element will hold a
  'form' property that holding the form DOM element. Inversely, the form element
  has an 'elements' property that contains a collection of the field elements
  inside of it.
  
  "The name attribute of a form field determines the way its value will be 
  identified when the form is submitted. It can also be used as a property name 
  when accessing the form’s elements property, which acts both as an array-like 
  object (accessible by number) and a map (accessible by name)."

  See './examples/example_7.html'.

  Clicking a button with the type of submit or pressing 'Enter' when a form
  field has focus will submit the form data.

  Before a request to the 'action' URL, a 'submit' event is fired. You can 
  listen for this event using JS and prevent the default behavior by calling
  #preventDefault on the event object.

  This will prevent the browser from navigating to the specified URL - 
  a necessity if you're building a SPA (single page application).

  In our event handler we can do a number of useful things before sending along
  the request such as validating user input before sending a request or using
  #fetch to send along the data instead of the form element's interface.
*/


/*
  Text Fields


  We can read the value of a given text field (textarea, or input fields with
  the text or password type) by reading the DOM elements value property. The
  value property can be read and written to.

  The selectionStart and selectionEnd properties of text fields give us 
  information about the cursor and selection in the text. When nothing is 
  selected, these two properties hold the same number, indicating the position 
  of the cursor. For example, 0 indicates the start of the text, and 10 
  indicates the cursor is after the 10th character. When text is selected, the
  values will differ. These properties can also be written to.

  See './examples/example_8.html' to see how these properties can be utilized
  to insert an ancient pharoh's name into the text box.

  "The "change" event for a text field does not fire every time something is 
  typed. Rather, it fires when the field loses focus after its content was 
  changed. To respond immediately to changes in a text field, you should 
  register a handler for the "input" event instead, which fires for every time 
  the user types a character, deletes text, or otherwise manipulates the field’s 
  content."

  See './examples/example_9.html'
*/


/*
  Checkboxes and Radio Buttons


  A checkbox's value (whether it is checked or not) can be accessed through it's
  'checked' value - this will be either true or false.

  See './examples/example_10.html'

  The <label> tag associates a piece of the document with an input field - 
  clicking anywhere on the label will bring focus to the specified input field
  (if the input field is a radio button or checkbox, it will toggle it).

  A radio button is nearly identical to a checkbox, expect it's tied to other
  radio buttons through it's name attribute so that only one out of the set can 
  be selected.

  See './examples/example_11.html'
*/


/*
  Select Fields


  Select fields are similar to radio buttons in that they allow you to choose
  1 option from a set of options. The style of the dropdown menu produced by
  a select tag is dependent on the browser. 

  Select fields also have a variant that allows you to choose multiple options
  instead of just one - just add the 'multiple' attribute to the select tag.
  In most browsers the layout of this element is different than a normal select
  tag.

  Inside of the select tag, we must place option tags to add choices to our 
  dropdown menu. If you set a value attribute on an option tag, then that is the
  value that is held by the option tag - if omitted then the value will be the
  textContent of the option tag.

  The value of the select element will be the value of the currently selected
  option. For a 'multiple' type select tag, this will only return the result of
  one of the selected options (quirk).

  The option tags for a select field can be accessed by the select tag's 
  'options' property. Each option has a property - 'selected' - that is either
  true or false and lets you know whether the option has been selected. 
  
  In order to check what option tags are selected in a 'multiple' type select
  tag - we must iterate through it's 'options' attribute and check whether each
  is selected or not using the option's 'selected' property.

  In order to select multiple options, you must hold CMD on a Mac (CTRL on other
  operating systems). 

  See './examples/example_12.html' for an example of a multiple select field.

  side note: This interface is super weird on a Chrome + Mac combination.. I can
  honestly say I haven't seen this used in the web in it's default style.
*/


/*
  File Fields


  File fields allow users to load a file from their local machine, or to load
  files from a Javascript program. The script cannot start reading private files
  from a user's computer unless a user selects a file in such a field. 

  File fields look like buttons labeled 'choose file' or 'browse', with info
  about the chosen file next to the button.

  See './examples/example_13.html'

  The 'files' property of a file field holds the selected files. In order to 
  select multiple files, you must add the multiple attribute to the input
  tag.

  Objects in the files object have properties like name, size, and type. It 
  DOES NOT have a property that holds the content of the file. In order to 
  see this content we must: 
  
  1) Create a FileReader object.

  2) Wait for the file to load by adding an event listener to the FileReader
  object that listens for a 'load' event. In the event handler, we will be able 
  to access the file's content by accessing the reader's 'result' property. 

  3) Call the 'readAsText' method on the FileReader, passing the file we want
  to read as an argument.

  See './example/example_14.html'

  If the file fails to load for any reason, the FileReader will fire an 'error'
  event, and the error object will be located in the FileReader's 'error'
  property. We can wrap the process of reading a file in a Promise to make it
  easier to work with.

  See './examples/example_15.js' to see a Promise-based interface for reading
  files.
*/

/*
  Storing Data Client-Side


  When an application needs to remember something between sessions, we can't
  store the data in JavaScript bindings because they are cleared each time we
  navigate away from the page. For a simple way of remembering data - we could
  utilize the browser's localStorage space (in other cases you may want to set
  up a server).

  Data stored in the localStorage object survives page reloads and the closing
  of browser windows. This can allow a user to stay logged into your site, even
  after they close the window.

--------------------------------------------------------------------------------
  localStorage.setItem("username", "marijn");
  console.log(localStorage.getItem("username"));
  // → marijn
  localStorage.removeItem("username");
--------------------------------------------------------------------------------

  Data stays here until it is removed by '#removeItem', it is overwritten, or
  the user clears their localStorage.

  Sites from different domains have their own compartments in localStorage. This
  means that no site can modify the data that's stored by another site on your
  browser.

  The localStorage object is conveinent, but it has a space limitation (this
  varies depending on the browser that you're using).

  See './examples/example_16.html' for an example of a crude note-taking app
  that makes use of the localStorage object.
*/