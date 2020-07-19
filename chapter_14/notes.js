// Chapter 14 Notes - The Document Object Model

/*
  First, go to browser and open up the Javascript Console (CMD + J [Mac],
  CTRL + J [Windows]).

  Run the following code:
*/

// the DOM
document;

// the root of the DOM tree
document.documentElement;

// the body node
document.body;

// the head node
document.head;

/*
  Traversing the DOM
*/

// returns a HTMLCollection of all the body's child elements one level deep
// prefer #children over #childNodes because first returns only elements.
let children = document.body.children;

// access a child's parent element
let firstChild = children[0].parentElement;
firstChild == document.body;

// access the following sibling element
// prefer #nextElementSibling over #nextSibling because first returns only elements.
children[0].nextElementSibling;

// access the preceding sibling element
// #previousElementSibling > #previousSibling
children[1].previousElementSibling;
children[1].previousElementSibling == children[0];


/*
  Tree (data structure) - a data structure that contains multiple nodes, every
  node can have only one parent, and parent nodes can have as many children 
  as they'd like.

  Since an HTML is represented by elements inside of elements, a tree is the 
  perfect way to structure data. Anytime you see the pattern where one piece 
  of data is going inside of another piece of data, you can bet a tree-like 
  data structure will be the result.

  As we saw in earlier chapters, trees and methods related to them tend to go 
  hand-in-hand with recursion.

  Trees are also often used when we need to store, access, modify, and delete
  data faster than we can in an ordinary array. AVL and Red-Black trees are a 
  good example of trees that have operations more efficient (overall) than an 
  array's.
*/

console.log(children[0].nodeType); //=> 1 (Element), 3 (Text), or 8 (Comment)


/*
  One funny thing about DOM Javascript is that many methods, such as #children,
  return "array-like" objects. This allows you to access elements by index,
  but you're left without your handy dandy enumerator methods that come with
  true arrays (map, reduce, slice).

  In order to get around this, you can either:
  
  1) Use a for loop to iterate through the NodeList / HTMLCollection

  2) Use the collection to construct an array. Like so:

  let newList = Array.from(list);
  // OR
  let newList = [...list];
*/


/*
  The below function searches for a string within an HTML document.
*/

function searchForText(node, string) {
  let children = [...node.childNodes];
  if (node.nodeType == 1) {
    for (let i = 0; i < children.length; i++) {
      if (searchForText(children[i], string)) {
        return true;
      }
    }
    return false;
  } else if (node.nodeType === 3) {
    return node.nodeValue.toLowerCase().indexOf(string) != -1;
  }
  return false;
}

searchForText(document.body, 'DuckDuckGo');

/*
  Querying the DOM

  Many times, you want to access a certain HTML element on the page without
  traversing the DOM, you can do this by using the following methods to query
  the DOM. You'll be returned the element(s) that match, if any.

  Call these elements on a DOM Node.

  getElementById - given an ID, reuturns the first element with that matching ID
  * in HTML, the standard is to use only one ID per page.

  getElementsByClassName - given a class name, returns all matching elements

  getElementsByTagName - given a tag name, returns all matching elements

  querySelector - given a CSS selector, returns the first matching element

  querySelectorAll - given a CSS selector, returns all the matching elements.


  Open './examples/example_1.html' for a short example.
*/

let link = document.getElementsByTagName('a')[0];
console.log(link.href); //=> "https://duckduckgo.com/about"

let sameLink = document.querySelector('a');
sameLink == link;

// Grab the first element with the ID 'logo_homepage_link'
let logoLink = document.querySelector('#logo_homepage_link');

// Returns a NodeList of all elements with the class 'site-wrapper'
let matches = document.querySelectorAll('.site-wrapper');

/*
  Changing the Document

  You can also add elements to the DOM, remove Elements from the DOM, and replace 
  elements in the DOM.

  #remove() - call this method on a Node to remove it from the DOM.

  #appendSibling(<newEl>) - call this method on a Node to append the new
  element to the end of the node's children. Takes only one argument.

  #append(...<newEl>) - does the same thing as appendSibling, but takes
  multiple arguments that it appends in order.

  #insertBefore(<newEl>, <targetEl>) - inserts a new element as a 
  previous sibling to the target element

  #replaceChild(<newEl>, <replaceEl>) - replaces the replaceNode with the new
  Node. replaceEl must be a child of the element this is invoked on.

  Open './examples/example_2.html' for an example.
*/

/*
  Creating Nodes

  #createTextNode(text) - creates a new text node using the supplied text

  #createElement(tagName) - creates a new node element with the same tag that
  you provided

  After creating an element, you should modify the attributes of that element so
  the element appears as you expect. For example, if you want to create a p tag
  with text inside of it, first call createElement and save the result into a 
  variable. Then, set that element's innerText property equal to the text you 
  want the p tag to contain. 
  
  Once that's done you must append the element to the page. First, use 
  querySelector or some other method to grab the element you want to append this
  element to. Then use the appendChild or append method, providing the newly 
  created p element as an argument. Voila, you now have created an element, 
  modified it's attributes, and inserted it into the DOM. 

  See './examples/example_3.html' for an example.
*/

/*
  Appending in Fashion

  See './examples/example_4.html' for another use case of creating and 
  appending elements to the DOM. Here, I've created a function 'elt' that treates 
  the first argument as the tagName of the element to be created, and it treats 
  the following arguments as it's children.
*/

/*
  Attributes

  For many built-in attributes, simply use dot notation to read the attribute 
  to access that property of the node. 

  You can also set whatever attributes you'd like on any node! In order to do 
  this use the following methods:

  #getAttribute(<attrName>) = reads the given attribute

  #setAttribute(<attrName>,<attrValue>) = sets an attribute with the given name
  and value

  The common practice for setting custom attributes is to prepend the name of 
  your attribute with "data-".

  Most modern browsers provide you with the .dataset property, which allows you
  to access an object with all of properties that are prepended with "data-"
  to prevent naming conflicts. Use this object to read back data from a node's 
  dataset or to set an attribute's value.

  EX:

  node.dataset.id = 8492;

  node.dataset.id; //=> 8492


  See './examples/example_5.html' to see an example of this in action.
*/  

/* 
  Layout

  All HTML tags have different a different 'display' value.

  One display value is 'block'. P tags and header tags are all displayed in a 
  block fashion. They take up the width of the page and render as the only 
  element on a given line - no other elements can be beside them.

  Another display type is 'inline' - anchor and strong tags display in this
  manner. This means that the element will be rendered on the same line as it's 
  sibling elements.

  The size and position of an HTML element is also useful information. To access
  the width and height of an element, access its' offsetWidth and offsetHeight
  properties. You will get back the number of pixels tall / wide the element is.

  clientWidth - returns the width of an element in px, ignoring the
  border of the element [remember the box model.]

  clientHeight - returns the height of an element in px, ignoring the 
  border of the element.

  See './examples/example_6.html' for a peek at this in action.
*/


/*
  In order to read an element's current position on the page (not including
  pixels passed while scrolling) call getBoundingClientRect on the element.

  This returns an object containing 4 coordinates: top, bottom, left, right.
  Each of these coordinates contain the number of pixels the edge is from 
  the top left of the screen on the corresponding axis.

  If you'd like to take scrolling into account, access the pageYOffset & 
  pageXOffset global bindings and add these numbers to each of the above 
  coordinates.

  Everytime you manipulate the DOM or read an element's position properties,
  the browser has to compute a new layout for the page. Computing layouts is 
  quite an expensive operation for the browser. Due to this, a program that 
  alternates between reading DOM layout information and manipulating the DOM 
  will run very slowly. 

  See './examples/example_7.html' for an example of this + benchmark.
*/

/*
  Styling

  Typically, the styling of HTML elements would be handled by the CSS file you
  associate with a given web page. But, you also have the option to declare
  CSS styles inside of your HTML file. 
  
  This is called inline styling, and we accomplish this by setting an element's 
  style attribute to a string containing CSS declarations. If the string 
  contains more than one declaration, each must be separated by a semicolon.

  See './examples/example_8.html' for an example.

  As you may have guessed, you can also access this property using Javascript.
  Simply access any element's style attribute, and then you can set or get any
  delcarations that are housed under the style property.

  See './examples/example_9.html' for another example!
*/

/*
  Positioning and Animating

  Positioning our elements in a certain place in the document may be one of the
  most single important tasks in styling. We can modify an element's position
  style property in order to change "how" it's positioned on the page.

  static - the element appears in the document where it would normally according
  to how the HTML tags are arranged.

  relative - the element can now be positioned relative to where it would
  normally appear if it has "position: static" declared. Use the top and left
  properties to modify the element's position.

  absolute - this will remove the element from the normal document flow (think
  about a sticky navBar). After being removed from the normal document flow,
  if any parent elements also have their position property set to absolute, this
  element will use that element's top-left corner as it's origin. If no parents
  have been set to aboslute, then the element will be positioned relative to the
  top-left of the page.

  See './examples/example_10.html' for an example of this in action, where we'll 
  build a simple animation.
*/