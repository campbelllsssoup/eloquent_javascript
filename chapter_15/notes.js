// Chapter 15 Notes - Handling Events
// Start time: 1425 7-20-20
// End time: 1855 7-20-20

/*
  Registering Event Handlers

  Many times when we're writing scripts for the browser, we're doing so to 
  implement some sort of interactivity within our site. We may want to listen
  for a key press, click, or mouse movement.

  In order to run blocks of code whenever an event occurs, we must register an
  event handler on the DOM node we intend to listen for events on. In order to 
  do this, we call the method #addEventListener on our eventful node. This
  method takes two arguments, the first being the 'event type', and the second
  is a function called the 'event handler'. The event handler will be called
  anytime the event described by the first argument is emitted.

  In order to remove an event handler, then call #removeEventListener on the 
  target node, passing the event type as the first arg and a variable that
  references the event handler as the second argument.

  There is another way to register events. Every node has a set of properties
  that holds event handlers (onclick, onsubmit, onkeypress, etc) for specific
  event types. So you could do something like the following in order to register
  an event handler.

  let node = document.querySelector('#uniq');
  node.onclick = () => { console.log("I work too!") };

  The difference between using 'on-event' properties to register event handlers
  and using addEventListener is that when you use the 'on-event' method you can
  only register one event handler for each event type on a node. This is sort of
  limiting, so try to stick to using addEventListener.
*/  

/*
  Event Objects

  Everytime that an event is emitted and an event handler is invoked, it is
  passed the event object. In order to bring this object into scope, write your
  callback function so that it takes in one parameter - this parameter will be 
  the event.

  The event object has a lot of useful information stored inside of it, such as
  the node that emitted the event, references to children nodes (this is quite
  useful when working with forms.), position of the element on the page, etc.

  The information that is stored inside of the event object will be different 
  for each event type that is emitted.
*/

/*
  Propagation

  Let's say you have a paragraph tag with a button element nested inside, and 
  you have click handlers attached to both of these elements. Which event fires
  off first?

  Typically, the handler on the innermost element will run first, and the outer
  last - this is called 'event propagation' because the events fire from the 
  inside to the outside. 

  If you'd like to prevent this activity, you have to call #stopPropagation
  on the event object inside of your handler. This will block the further 
  propagation of the event - and this can be called on the innermost element
  or one of it's parents where you'd like the propagation to stop.

  This is useful when you have one clickable element nested inside of another.

  See './examples/example_1.html' to see this in action.
*/

/*
  Event Delegation

  Sometimes, you'll have many elements on the page that are identical and you
  want to add event listeners to. Think like buttons on Facebook page. Well,
  we could accomplish this in a few ways. We could use querySelectorAll to 
  grab all of the matching elements, iterate through that list, attaching
  handlers to each node.

  OR, we could do this a bit easier (and cheaper resource-wise). If we first
  find the common parent element of all of the like buttons and add
  an event listener to this element, we can then use conditional logic inside of
  the event handler to run our code ONLY IF we know that we've clicked on a button.

  We use the event object and read it's various properties (e.target.className,
  e.target.nodeName, etc.) in order to determine if we've clicked on the button.

  See './examples/example_2.html' to see an example of this.
*/

/*
  Default Actions

  Most events have default actions tied to them: when you submit a form the page
  refreshes, when you click a link it takes you to the link's target, and so on.

  Sometimes, the default action isn't what we desire out of the interaction - if
  you need to stop the default action from running all you have to do is call
  #preventDefault on the event object that's passed to your handler.

  This is especially common and useful when working with forms, the default
  action of a form is highly undesirable for a modern site, especially a SPA.

  Some events can't be intercepted on some browsers. For example, on Chrome you
  can't intercept the 'close-tab' shortcut (CMD + W).

  See './examples/example_3.html' for an example.
*/

/*
  Key Events

  There are a number of event types related to keys. Two of them are 'keyup' and
  'keydown' and they do what it sounds like - listen for key releases and key
  presses. The keyup event fires only once when the key is released, but keydown
  fires everytime the key repeats (continuously while it's held down) - be
  mindful of this when listening for these event types.

  The key event will originate from whatever DOM node has focus at that current
  time. You can give a DOM node focus by giving it a tabIndex attribute (which
  will allow a user to focus on the element by pressing tab until it reaches
  the element). If no element has focus at the time, then document.body will
  be the node that event is emitted from.

  You shouldn't use key events to try and determine what has been typed - instead
  attach an 'input' event listener to the textfield. The callback function will
  fire everytime the content changes. Then you can access e.target.value to grab
  the string that's currently entered into the text field.

  See './examples/example_4.html' && './examples/example_5.html'.
*/

/*
  Pointer Events

  Touchscreens and mice emit different events - when programming we should be 
  mindful of this to create a well-rounded experience for all users.

  When you press the mouse, a mousedown event is fired on the DOM node
  immediately below the cursor - when you release a mouseup event is fired.

  After the mouseup event fires, a click event fires on the most specific node
  that contained both the press and the release of the button (think lowest
  common parent element - if they both occurred on the same element the click
  event is emitted from that element).

  If two clicks happen close together, a 'dblclick' event is emitted after the
  second click event.

  To get the location of a click, read the event object's clientX and clientY
  properties. This will return the coordinates of the event using the top-left
  corner of the whole document (not the window) as the origin.

  See './examples/example_6.html'.
*/

/*
  Mouse Motion

  Everytime the mouse moves a mousemove event is emitted. You can use this to
  read the position of the mouse, a useful ability when building a game or a 
  drag-and-drop feature.

  See './examples/example_7.html'
*/

/*
  Touch Events

  You may end up having to design your site to work with touchscreens. In these
  situations, the mousemove, mouseup, and mousedown events are poor substitutes
  for listening for touch events. Some basic interactivity (ex: users can still 
  press buttons and the click events will fire) can be accomplished without touch
  events - but usually you'll need to use the touch-related events to 
  build the user experience the way you need to.

  When a finger starts touching the screen, the 'touchstart' event is fired.
  When the finger moves, a 'touchmove' event will fire, and when a person lifts
  their finger a 'touchend' event fires.

  Since you can have multiple fingers touching the screen at any given time, the
  event object for touch events return an array of 'touches' coords (accessed
  through the .touches property). This array contains the coords of each finger
  that's currently in contact with the screen.

  You'll want to prevent the default behavior of touch events in many cases
  where you don't want the screen to scroll or swipe while a user is touching
  the screen AND to prevent mouse events from firing.

  See './examples/example_8.html'.
*/

/*
  Scroll Events

  Whenever an element is scrolled, a scroll event is fired. This can be useful
  for knowing where a user is on the page - you may want to kill animations that 
  are no longer within view, track user data, or update some sort of progress 
  bar.

  Calling prevent default on scroll events does not prevent scrolling. The 
  scroll event fires AFTER the document scrolls.

  See  './examples/example_9.html'.
*/

/*
  Focus Events

  When an element gains focus, it fires a 'focus' event. When focus leaves the 
  element, a 'blur' event fires.

  These two events DO NOT propogate.

  The window object receives a 'focus' or 'blur' event when the user moves from
  or to the browser tab or window in which the document is shown.

  See './examples/example_10.html'.
*/

/*
  Load Event

  When a page finishes loading, the 'load' event fires on the window and the
  document's body. This event type is useful, because sometimes you must wait 
  until the whole page has loaded to initialize an action (for example, you 
  can't add an event listener to a DOM node that isn't on the page yet).

  Images and script tags that load external resources also fire a load event 
  whenever their contents are done loading.

  When a page is closed or navigated away from, the document fires a 
  'beforeunload' event. This event is useful for saving someone's work as they
  leave, or other experience-ending actions. Calling preventDefault on the event
  will not have an effect on the way this event functions. In order to alert 
  a user ('Are you sure you'd like to leave this page?') return a non-null value
  from the event handler. 

  Load events do not propogate.
*/

/*
  Events and the Event Loop

  Event handlers operate the same way that other asynchronous actions do -
  they're place in the message queue and once the stack is clear (there is no
  active script running) the handler is executed.

  Since events can only be processed when the stack is clear of frames,
  if a long-running script is being processed the screen will appear frozen for
  a period of time - giving the impression of a laggy and slow running page.
  Adding too many short event handlers or too many long running handlers may
  cause this to occur.

  In order to execute long-running process, you shouldn't execute them in your
  main executino thread. Instead, you should run the cumbersome code inside of 
  a 'Web Worker'. 
  
  Web Workers are objects that allows you to run JS files in a seperate 
  thread. 

  Workers don't share their global scope or any other data with the main
  script's environment. In order to send we must send messages and to receive
  messages we must add an event listener to the worker's global scope with an
  event type of 'message'.

  Only values that can be represented as JSON can be sent as messages, and 
  a COPY of that data is sent, not the REAL data.

  See './examples/example_11.html' for an example of WebWorkers in action.
*/

/*
  Timers

  setTimeout registers a callback function that will be executed after the 
  specified time passes. Sometimes, you may want to cancel this invocation
  prematurely.

  In order to do this save the timer that's returned after calling setTimeout
  into a variable. Then, call clearTimeout passing in the timer as an argument.


  The cancelAnimationFrame works in the same way to cancel animations queued
  by requestAnimationFrame.

  We can cancel intervals created by setInterval in the same way by calling
  clearInterval with the object that's returned from setInterval as its'
  argument.
*/

/*
  Debouncing

  Some events have a high potential of firing rapidly and often (mousemove and
  scroll for example). BE SURE to not include 'expensive' operations in these 
  event's handlers as this could make the page lag and start to feel unresponsive.

  If you do need to do something often in such a handler, it's a good idea to 
  use setTimeout to make sure that you're not doing it too often (on each event
  emission). This is called 'debouncing' the event.

  In Example 12, we're going to implement debouncing, and we want to console.log
  after a user has stopped typing INSTEAD of each time the input event fires.

  See './examples/example_12.html'.
*/