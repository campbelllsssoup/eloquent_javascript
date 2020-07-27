// Chapter 17 Notes - Drawing on Canvas
// Start time: 1730 7-24-20


/*
  Intro

  You can get pretty far drawing graphics using DOM elements, but a few
  tasks will become cumbersome and awkward. One example of this is 
  trying to use the DOM to draw a line between two points on the page.

  The DOM wasn't originally designed to draw graphics, thankfully we have
  two alternatives:

  SVG - (Scalabale Vector Graphics) XML-based markup language for describing
  2-D based vector graphics. They can rendered cleanly at any size (scalable)
  and are designed to work with other web standards.

  Vector Graphics - computer graphics images that are defined in terms of 
  points on a Cartesian plane, which are connected by lines and curves to form
  polygons and other shapes.

  Canvas API - provides a means for drawing graphics via JS and the <canvas> HTML
  element. It can be used for animation, game graphics, data visualization, 
  photo manipulation, and real-time video processing. Largely focuses on 2D
  graphics (for 3-D use the WebGL API w/ the Canvas element)
*/

/*
  SVG vs. Canvas API

  The main difference between a canvas and a SVG picture is that in SVG the 
  original description of the shapes is preserved so that they can be moved
  or resized at any time.

  A canvas drawing converts the shapes to pixels (colored dots on a raster)
  as soon as they are drawn and doesn't remember what these pixels represent.

  The only way to move a shape on a canvas is to clear the canvas and redraw
  it with the shape in a new position.
*/ 

/*
  SVG

  See './examples/example_1.html' to see a set of simple SVG shapes.

  THe xmlns attribute changes an element and it's children to a different
  XML namespace. This namespace specifices the dialect that we are currently
  speaking.

  The circle and rect tags draw shapes using the style and position specified
  by their attributes.

  These tags create DOM elements just like HTML tags that scripts can interact
  with. 

  See './examples/example_2.html' for proof that we can modify a SVG-based
  DOM element.
*/

/*
  The Canvas Element

  Canvas graphics can be drawn onto a <canvas> element. Give this element
  width and height attributes to determine it's size in pixels.

  Each new canvas is empty (transparent and blank) and shows up as empty space
  in the document.

  The canvas element allows us to draw different types of graphics (2-D & 3-D),
  so the first thing we must do is specify what type of graphics we're drawing.
  To do this we create a 'context' an object whose methods provide the drawing
  interface.

  There are two main contexts: 'webgl' (for 3-D graphics using OpenGL) and '2d'.

  We create contexts by calling the getContext method on the DOM element that
  represents the canvas:

  `
    let canvas = document.querySelector('canvas');
    let context = canvas.getContext('2d');
  `

  See './examples/example_3.html' for a basic example of how to draw 2-D 
  graphics on a canvas element.
*/

/*
  Lines and Surfaces

  In the canvas interface a shape can be filled (it's are is given a certain
  color or pattern) or it can be stroked (a line is draw along it's edge). The
  same terminology is used by SVG.

  'fillRect' fills a rectangle, using it's top-left corner specified by the first
  two arguments (x and y coords) and it's width and height - the last two 
  arguments.

  The color of the fill, thickness of the stroke, and other properties that
  define the shape are determined by the other properties of the context object.

  The 'fillStyle' property controls the way shapes are filled.

  The 'strokeStyle' property works similarly, but determines the color used for a
  stroked line. The width of that line is determined by the 'lineWidth' property..

  When no width or heght attribute is specified on a canvas element, it gets
  a default width of 300px and height of 150px.
  
  See './examples/example_4.html' to see some further uses of these properties.
*/

/*
  Paths

  A path is a sequence of lines. The interface for specifying paths is different
  from what we've seen before - they're not values that can be stored and passed
  around. If you want to do something with a path, you must make a sequence of 
  method calls to describe it's shape.

  See './examples/example_5.html' for path drawing enlightment.

  When filling a path (by calling 'fill'), each shape is filled separately. In
  order for a path to be filled, the lines must connect to form a closed shape.

  If the lines don't form a closed shape, then a line will be drawn from the 
  end of the last segment to the start of the path and the shape enclosed will
  be filled.

  See './examples/example_6.html'

  In Example 6, we draw a path that forms a triangle - yet we only draw two
  sides of the triangle. The 3rd line is drawn implicity by the canvas object
  when the 'fill' method is called.

  We could also use the 'closePath' method to explicity close the path.


  The catch here is that if we were to stroke the path, the 3rd line would 
  not be implicity drawn. If we we're stroking instead of filling, then 
  it would be vital that we use the 'closePath' method to form the triangle.

  To be on the safe side, use closePath each time that you are done drawing
  a path.
*/

/*
  Curves

  A path can also contain curved lines.

  The 'quadraticCurveTo' method draw a curve to a given point. To determine
  the curvature of the line, the method is given a control point and a
  destination point. The control point 'attracts' the line giving it it's curve.

  Imagine you have an ever-flexible straw that is typically linear. If you
  pull upwards on the middle of the straw the start and end points of the line
  now point towards your finger. Your finger is lined up with control point in 
  this case because it controls how curved the line is - except the control 
  point in this case is a bit above where your finger would be on the straw.

  See './examples/example_7.html' for an example.

  The 'bezierCurveTo' method draws a similar kind of curve. One difference is 
  that this curve has two control points, one for each of the line's endpoints.

  See './examples/example_8.html'

  The two control points specify the direction at both ends of the curve. The 
  farther they are away from their corresponding point, the more the curve will
  bulge in that direction.

  Getting the shape you desire using 'bezierCurveTo' can be difficult - it
  typically involves a bit of trial and error.

  The 'arc' method allows you to draw a line that curves along the edge of a 
  circle. It takes a pair of coordinates for the arc's center, a radius,
  and a start and end angle (measured in radians) as arguments.

  A full circle has a value of 2PI, which is around 6.28 - the angle starts
  counting from the point at the right of the circle's center and is measured
  clockwise from there. You can use a start of 0 and an end bigger than 2PI to
  draw a full circle.

  See './examples/example_9.html'
*/

/*
  Drawing a Pie Chart

  Now we're going to use a few of the skills we've learned so far. Take this
  array (which represents survey results):

  `const results = [
  {name: "Satisfied", count: 1043, color: "lightblue"},
  {name: "Neutral", count: 563, color: "lightgreen"},
  {name: "Unsatisfied", count: 510, color: "pink"},
  {name: "No comment", count: 175, color: "silver"}];`

  and convert the data to a pie chart.

  See './examples/example_10.html'

  There's one issue with this pie chart though.. it doesn't tell us what
  each slice represents! In order to satisfy that requirement, we'll have to
  learn how to draw text to the canvas.
*/

/*
  Text

  There are two methods to write text on the canvas - #fillText and #strokeText.

  The latter can be useful for outlining letters, but typically you'll use 
  #fillText to write text on the canvas.

  See './examples/example_11.html'

  We specify the size, style, and font of text by assigning a value to the 
  #font property ('bold 16px Times New Roman' | '16px Georgia'). 

  The last two arguments passed to the #fillText method specify the text's 
  alphabetic baseline and it is what the text 'stands on'. Letters such as
  j or p will hang slightly lower than the alphabetic baseline.

  You can change the horizontal position by setting the 'textAlign' property 
  to 'end' or 'center' and the vertical position by setting 'textBaseline'
  to 'top', 'middle', 'bottom'.
*/

/*
  Images

  There are many types of graphics in computer graphics: vector graphics and 
  bitmap graphics are two of the most common types. The first is what we've 
  been using so far in this chapter - specifying a picture by giving a logical
  description of shapes.

  Bitmap graphics are a bit different - they don't specify shapes. Instead
  it works with pixel data (rasters of colored dots). You can think of this
  as a matrix of pixels where each one is colored according to how you want the
  image to appear.

  The 'drawImage' method allows us to draw pixel data onto the canvas. The
  pixel data can come from an img element or another canvas element.
  
  When loading an image, be sure to wait until the image has fully loaded by 
  adding an event listener that listens for a load event to be fired.

  Just to clarify, if you try to draw an image and the image has not yet
  loaded, the image will never be drawn.

  By default 'drawImage' will draw the image at it's original size. You can 
  also give it two additional arguments to set a different height and width.

  When drawImage is given nine arguments, it can be used to draw only a fragment
  of an image. The second through fifth arguments indicate the
  rectangle (x, y, width, and height) in the source image that should be copied.
  The sixth to ninth arguments given the rectangle (on the canvas) into which it
  should be copied.

  This can be used to pack multiple sprites (image elements) into a single 
  image file and then draw only the part you need.
  
  Say for example, you have an image that contains 10 sprites and each of the 
  sprites represent a snapshot of what the character looks like while running.
  By alternating which pose we draw, we can show an animation that looks like
  a running character.

  To animate a picure on a canvas, the 'clearRect' method is useful. It
  resembles 'fillRect' but instead of coloring the rectangle it makes it 
  transparent (since the canvas is transparent) - removing the previously
  drawn pixels.

  In the below example, each sprite is 24px wide x 30px tall. In the example,
  we load the image and then set up an interval to draw the next frame - this
  simulates animation.

  See './examples/example_13.html' for your first animation BD


*/

/*
  Transformation

  If we wanted the character in Example 13 to walk to the left instead of to 
  the right, we can tell the canvas to draw the character in the opposite
  direction.

  Calling the 'scale' method will cause anything drawn after that point to be
  scaled. It takes two parameters, horizontal and vertical scale.

  See './examples/example_14.html'

  You'll see that calling scale before drawing the circle causes the circle to
  be stretched into an ellipse. In addition to that, even the line width is 
  stretched.

  If you want to reverse the direction of a canvas drawing, simply provide scale
  a negative integer value.

  "The flipping happens around point (0,0), which means it will also flip the 
  direction of the coordinate system. When a horizontal scaling of -1 is 
  applied, a shape drawn at x position 100 will end up at what used to be 
  position -100."

  This is exactly how transformations work in Euclidean Geometry.

  "You could adjust the coordinates given to drawImage to compensate for this by 
  drawing the image at x position -50 instead of 0 (don't adjust y position)."

  You could also adjust the axis where the scaling happens - this way the code
  that draws doesn't have to know about the scale change. (We can use 'translate' 
  in order to accomplish this?)

  There are other methods that work with the coordinate system for a canvas:

  1. rotate drawn shapes using the 'rotate' method

  2. move drawn shapes around using the 'translate' method

  One tricky thing about these methods is that they "stack" - each one happens
  relative to previous transformations.

  "To flip a picture around the vertical line at given x position, we can do the 
  following:"" 

  function flipHorizontally(context, around) {
    context.translate(around, 0);
    context.scale(-1, 1);
    context.translate(-around, 0);
  }

  "We move the y-axis to where we want our mirror to be, apply the mirroring, 
  and finally move the y-axis back to its proper place in the mirrored 
  universe."

  See './examples/example_15.html' for greatness.
*/

/*
  Storing and Clearing Transformations

  By default, our transformations stick around after we apply them. In practice,
  this may not be particularly useful. For functions that need to temporarily
  transform the coordinate system, it's wiser to save the current transformation
  for later use.

  The 'save' and 'restore' methods on the 2D canvas context allow us to do this.
  These methods allow you to store a transformation state on a stack by calling
  'save' - you can pop the last saved transformation state by calling 'restore'.
  We can also call 'resetTransform' to fully reset the transformation.

  The 'branch' function in Example 16 shows us how we can use this 
  transformation storage to our advantage.

  See './examples/example_16.html' for an eye opener.
*/

/*
  Back to the Game

  See './examples/canvas_display.js' and read along with book for detailed
  explanation.
*/

/*
  Choosing a Graphics Interface

  To display graphics in the browser you can choose between HTML, SVG, and
  canvas. Each has their own pros and cons + use cases.

  Plain HTML - simple, easy to work with text

  SVG - high quality graphics that look good at any size / zoom level. Designed
  for drawing.

  Canvas - direct pixel manipulation, drawing capabilities, draws many small 
  shapes well, some effects can only be handled using canvas (ray tracer, 
  blurring pictures, distorting etc.)
*/

/*
  The Case for HTML or SVG

  "Both SVG and HTML build up a data structure (the DOM) that represents your 
  picture. This makes it possible to modify elements after they are drawn. If 
  you need to repeatedly change a small part of a big picture in response to 
  what the user is doing or as part of an animation, doing it in a canvas can 
  be needlessly expensive. The DOM also allows us to register mouse event 
  handlers on every element in the picture (even on shapes drawn with SVG). 
  You can’t do that with canvas."
*/

/*
  The Case for Canvas

  Canvas’s pixel-oriented approach can be an advantage when drawing a huge 
  number of tiny elements. The fact that it does not build up a data structure 
  but only repeatedly draws onto the same pixel surface gives canvas a lower 
  cost per shape.

  There are also effects, such as rendering a scene one pixel at a time (for 
  example, using a ray tracer) or postprocessing an image with JavaScript 
  (blurring or distorting it), that can be realistically handled only by a 
  pixel-based approach.
*/

/*
  You can combine these techniques also to get the best of each of them.

  Ex: Draw a graph with SVG and overlay text using HTML.
*/