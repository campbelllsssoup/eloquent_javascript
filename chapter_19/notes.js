// Chapter 19 Notes - Project: A Pixel Art Editor
// Start time: 0730h 7-29-20
// End time: 1834h 7-29-20


/*
  Components

  The editor will consist of a canvas upon which the user draws, and form fields
  below the canvas. These form fields are:

  - Tool picker (draw pixel, draw rectangle, fill area)
  - Color picker
  - Save button
  - Load button
  - Undo button

  The editor interface will be structured as a number of components, objects
  that are responsible for a piece of the DOM and that may contain other
  components inside of them (think React).

  Application state:

  - Current picture
  - selected tool
  - selected color

  Our state will live inside of a single value, and the interface components
  will base the way they look on the current state. Doing so reduces the 
  complication of our application because we don't have to read / update state
  in two different places.

  Along with keeping our state in one value (an object?), we're going to be 
  disciplined about the 'data flow' in our application. The interface will be
  drawn based on what the state currently is - when a user wants to cause an
  update to the interface, we will update the state, and in turn the interface
  will synchronize after the state updates.

  Each component is setup so that when it is given a new state, it also notifies
  its child components. 

  Updates to the state are represented as POJOs, which we'll call 'actions' 
  (think Redux). Components create 'actions' and 'dispatch' them - send them to 
  the central state management function (reducer in Redux). That function
  computes the next state, after which the interface components update to 
  reflect the new state.

  State update cycle - the state determines what the DOM looks like, the only
  way the DOM events can change the state is by dispatching actions to the 
  state. State changes go through a single well-defined channel.

  Components are classes conforming to an interface. Their constructor is given
  a state and uses that to build up a 'dom' property (DOM element that
  represents the component). The constructor will also take in values such as
  the dispatch function.
  
  Each component has a 'syncState' method that is used to synchronize it to a 
  new state value. The method takes state as an argument.

*/


/*
  The State

  The application state is a POJO that contains picture, tool, and color
  properties. The picture is an object that stores the width, height and pixel
  content of the picture - each pixel's color is stored in this.pixels inside
  of an array.

*/

class Picture {

  constructor(width, height, pixels) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }

  static empty(width, height, color) {
    let pixels = new Array(width * height).fill(color);
    return new Picture(width, height, pixels);
  }

  pixel(x, y) {
    return this.pixels[x + y * this.width];
  }

  draw(pixels) {
    let copy = this.pixels.slice();
    for (let {x, y, color} of pixels) {
      copy[x + y * this.width] = color;
    }
    return new Picture(this.width, this.height, copy);
  }

}

/*
  The State

  Pictures should be structured as immutable values. We provide a #draw method
  so that we can update multiple pixels at one time. The empty method allows
  us to create an array in which all pixels have the same color.

  Colors are represented as CSS color codes (#000000)

  Actions will be plain objects that are 'dispatched' (sent to the update/reduce
  function). We will set it up to where a property in the action overrides the 
  value that was present in the old state (in an immutable fashion).

*/

function updateState(state, action) {
  return {...state, ...action};
}

/*
  DOM Building

  Interface components will mainly render the DOM - in order to decrease the 
  verbosity of our code we can write an 'elt' function like we used in previous
  chapters so that we don't overcomplicate DOM rendering.

*/

function elt(type, props, ...children) {
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);
  for (let child of children) {
    if (typeof child != "string") dom.appendChild(child);
    else dom.appendChild(document.createTextNode(child));
  }
  return dom;
}

/*
  DOM Building

  The main difference between this version and the one we used in Chapter 16 is 
  that it assigns properties to DOM nodes, not attributes. This means we can’t 
  use it to set arbitrary attributes, but we can use it to set properties whose 
  value isn’t a string, such as onclick, which can be set to a function to 
  register a click event handler.

  Building 'elt' this way allows us to attach event listeners like so:

  <body>
    <script>
      document.body.appendChild(elt("button", {
        onclick: () => console.log("click")
      }, "The button"));
    </script>
  </body>

*/


/*
  The Canvas

  First, we'll build the component that displays a picture as a series of 
  pixels in a grid. This component must have two capabilities: 
  
  - showing a picture
  - communicating pointer events on that picture to the rest of the app

  These pieces of functionality don't rely on any pieces of our application
  state. It doesn't know how the whole application works, so it cannot directly
  dispatch actions.

  When responding to pointer events, it will instead call a callback function
  provided by the code that created it, which will handle the application 
  specific parts. 
  
  (note: This is similar to modifying the state of a parent in React)

*/

const scale = 10; // each pixel is a 10x10 square.

class PictureCanvas {

  constructor(picture, pointerDown) {
    this.dom = elt("canvas", {
      onmousedown: event => this.mouse(event, pointerDown),
      ontouchstart: event => this.touch(event, pointerDown)
    });
    this.syncState(picture);
  }

  syncState(picture) {
    // only re-draws if the picture has been modified - avoids extra work.
    if (this.picture == picture) return; 
    this.picture = picture;
    drawPicture(this.picture, this.dom, scale);
  }

}

function drawPicture(picture, canvas, scale) {
  canvas.width = picture.width * scale;
  canvas.height = picture.height * scale;
  let cx = canvas.getContext("2d");

  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      cx.fillStyle = picture.pixel(x, y);
      cx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
}


/*
  The Canvas

  When the left mouse button is pressed while the mouse is over the picture 
  canvas, the component calls the pointerDown callback, giving it the position 
  of the pixel that was clicked—in picture coordinates. This will be used to 
  implement mouse interaction with the picture. The callback may return another 
  callback function to be notified when the pointer is moved to a different 
  pixel while the button is held down.

*/

/* 
  Element#getBoundingClientRect - This method returns a DOMRect object with 
  eight properties: left, top, right, bottom, x, y, width, height. 
*/

PictureCanvas.prototype.mouse = function(downEvent, onDown) {
  if (downEvent.button != 0) return;
  let pos = pointerPosition(downEvent, this.dom);
  let onMove = onDown(pos);
  if (!onMove) return;
  let move = moveEvent => {
    if (moveEvent.buttons == 0) {
      this.dom.removeEventListener("mousemove", move);
    } else {
      let newPos = pointerPosition(moveEvent, this.dom);
      if (newPos.x == pos.x && newPos.y == pos.y) return;
      pos = newPos;
      onMove(newPos);
    }
  };
  this.dom.addEventListener("mousemove", move);
};

function pointerPosition(pos, domNode) {
  let rect = domNode.getBoundingClientRect();
  return {x: Math.floor((pos.clientX - rect.left) / scale),
          y: Math.floor((pos.clientY - rect.top) / scale)};
}

PictureCanvas.prototype.touch = function(startEvent, onDown) {
  let pos = pointerPosition(startEvent.touches[0], this.dom);
  let onMove = onDown(pos);
  startEvent.preventDefault();
  if (!onMove) return;
  let move = moveEvent => {
    let newPos = pointerPosition(moveEvent.touches[0], this.dom);
    if (newPos.x == pos.x && newPos.y == pos.y) return;
    pos = newPos;
    onMove(newPos);
  };
  let end = () => {
    this.dom.removeEventListener("touchmove", move);
    this.dom.removeEventListener("touchend", end);
  };
  this.dom.addEventListener("touchmove", move);
  this.dom.addEventListener("touchend", end);
};


/*
  The Application

  The main component of our application is a shell around the canvas and a 
  dynamic set of tools and controls that we pass to it's constructor.

  The 'controls' are the interface elements that are located below the canvas.
  They'll be provided as an array of component constructors.

  The 'tools' will do things like drawing a pixel or filling in an area. The
  currently selected tool will determine what happens when the user interacts
  with the picture with a pointer device. The set of available tools will be
  provided as an object that maps the name of the tool to functions that
  implement its functionality. These functions receive a picture position,
  application state, and dispatch function as arguments. They may return a move
  handler function that gets called with a new position and a current state
  when the pointer moves to a different pixel.
*/


class PixelEditor {
  constructor(state, config) {
    let {tools, controls, dispatch} = config;
    this.state = state;

    this.canvas = new PictureCanvas(state.picture, pos => {
      let tool = tools[this.state.tool];
      let onMove = tool(pos, this.state, dispatch);
      if (onMove) return pos => onMove(pos, this.state);
    });
    this.controls = controls.map(
      Control => new Control(state, config));
    this.dom = elt("div", {}, this.canvas.dom, elt("br"),
                   ...this.controls.reduce(
                     (a, c) => a.concat(" ", c.dom), []));
  }
  syncState(state) {
    // updates state on each child component when appState updates
    this.state = state;
    this.canvas.syncState(state.picture);
    for (let ctrl of this.controls) ctrl.syncState(state);
  }
}


/*
  The Application

  The first control is the tool selection menu. It creates a select element with
  an option for each tool and sets up a 'change' event handler that updates
  the application state when the user selects a different tool.
*/


class ToolSelect {
  constructor(state, {tools, dispatch}) {
    this.select = elt("select", {
      onchange: () => dispatch({tool: this.select.value})
    }, ...Object.keys(tools).map(name => elt("option", {
      selected: name == state.tool
    }, name)));
    this.dom = elt("label", null, "🖌 Tool: ", this.select);
  }
  syncState(state) { this.select.value = state.tool; }
}


/*
  The Application

  Now that we've built a control to tool selection, let's add a color selection
  control. You can give an input element a type value of color to build a form
  field that is built specifically for picking colors - the value it returns is
  in the '#RRGGBB' format. The browser will show a color picker interface when
  a user clicks on the field.

*/


class ColorSelect {
  constructor(state, {dispatch}) {
    this.input = elt("input", {
      type: "color",
      value: state.color,
      onchange: () => dispatch({color: this.input.value})
    });
    this.dom = elt("label", null, "🎨 Color: ", this.input);
  }
  syncState(state) { this.input.value = state.color; }
}


/*
  Drawing Tools

  The draw tool will change any pixel you click or tap on to the currently
  selected color.  It dispatches an action that updates the picture to version
  in which the pointed-at pixel is given the currently selected color.

*/

function draw(pos, state, dispatch) {
  function drawPixel({x, y}, state) {
    let drawn = {x, y, color: state.color};
    dispatch({picture: state.picture.draw([drawn])});
  }
  drawPixel(pos, state);
  return drawPixel;
}

/*
  Drawing Tools

  The function immediately calls the drawPixel function, but then returns it
  so that it is called again for newly touched pixels when the user drags or
  swipes over the picture.

  To draw larger shapes, we'll add the rectangle tool - which draws a rectangle
  between the point where you start dragging and the point that you drag to.

*/

function rectangle(start, state, dispatch) {
  function drawRectangle(pos) {
    let xStart = Math.min(start.x, pos.x);
    let yStart = Math.min(start.y, pos.y);
    let xEnd = Math.max(start.x, pos.x);
    let yEnd = Math.max(start.y, pos.y);
    let drawn = [];
    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        drawn.push({x, y, color: state.color});
      }
    }
    // When dragging, the rectangle is redrawn on the picture from the original
    // state. If we were to dispatch inside of our loop above, we would be 
    // drawing the rectangle everytime an untouched pixel is encountered.
    dispatch({picture: state.picture.draw(drawn)});
  }
  drawRectangle(start);
  return drawRectangle;
}


/*  
  Drawing Tools

  An important detail in this implementation is that when dragging, the 
  rectangle is redrawn on the picture from the original state. That way, you 
  can make the rectangle larger and smaller again while creating it, without 
  the intermediate rectangles sticking around in the final picture. This is a 
  HUGE reason why immutable picture objects are useful.


  Implementing flood fill is a bit more involved. With this tool, we want to 
  paint over the pixel that the mouse clicks on and all adjacent pixels with the
  same color (adjacent in this case means vertically and horizontally, not 
  diagonally). 

  One way we can do this is by using a BFS to find all 'connected' pixels, and
  storing these pixel's in an array. After we've built this array, we can
  dispatch an action to our 'store' (central state management construct).


*/


const around = [{dx: -1, dy: 0}, {dx: 1, dy: 0},
  {dx: 0, dy: -1}, {dx: 0, dy: 1}];

function fill({x, y}, state, dispatch) {
  let targetColor = state.picture.pixel(x, y);
  let drawn = [{x, y, color: state.color}];
  for (let done = 0; done < drawn.length; done++) {
    for (let {dx, dy} of around) {
      let x = drawn[done].x + dx, y = drawn[done].y + dy;
      if (x >= 0 && x < state.picture.width &&
          y >= 0 && y < state.picture.height &&
          state.picture.pixel(x, y) == targetColor &&
          !drawn.some(p => p.x == x && p.y == y)) {
        drawn.push({x, y, color: state.color});
      }
    }
  }
  dispatch({picture: state.picture.draw(drawn)});
}

/*
  Drawing Tools

  First, we read from the oldState's picture to get the color of the pixel we've 
  just clicked on. Then, we begin a 'work array' - drawn - that stores all of 
  the adjacent pixels that match the targetColor. 
  
  We iterate through this array, operating on each pixel that's passed into
  it. Once we've checked each pixel for color adjacency that passes our 
  conditions, we will exit out of this loop.

  Inside of the outer 'work loop', we iterate through the around array, which
  contains offset objects that, when added to the current pixel's position, will
  give us the coordinates of its N, E, S, and W neighbor. 

  Inside of the 'neighbors loop', we perform the vector addition to get one of 
  the pixel's neighbors. Then, we run it through a conditional that checks if
  the neighbor is within the bounds of the canvas, if it's color is equal to
  the targetColor, and we make sure that we haven't already processed this
  neighbor.

  If the neighbor pixel passes all of the tests, we push it into the work list. 

  Once we're done processing all the pixel that passed our tests, we dispatch
  an action containing a newly redrawn picture to the store.

  The final tool is a color picker, which lets you point at a color in the
  picture to use it as the drawing color.


  See './examples/example_1.html' for an MVP of our application.
*/

function pick(pos, state, dispatch) {
  dispatch({color: state.picture.pixel(pos.x, pos.y)});
}

/*
  Saving and Loading

  Now, we'll add a button for downloading the current picture as an image file.
  This will manifest as another control that we'll add to our config object when
  we create our PixelEditor instance.
*/

class SaveButton {

  constructor(state) {
    this.picture = state.picture;
    this.dom = elt("button", {
      onclick: () => this.save()
    }, "💾 Save");
  }

  save() {
    let canvas = elt("canvas");
    drawPicture(this.picture, canvas, 1);
    let link = elt("a", {
      href: canvas.toDataURL(),
      download: "pixelart.png"
    });
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  syncState(state) { this.picture = state.picture; }

}

/*
  Saving and Loading

  To create the image file, we create a new canvas element and draw the current
  picture (stored in our state) on the canvas. After that, we create a link 
  element that references a Data URL representation of our picture,, and we 
  also add a 'download' attribute to the element.

  The download element on a link tag is a HTML attribute that modifies the
  typical behavior of the anchor tag - instead of navigating you to another page,
  clicking on this link will initiate a download of the resource it's pointing
  to. The file will be named whatever string you provide to the download
  attribute.

  After creating and appending this link to the dom, we click it
  progammatically by calling click on the link DOM element so that the download
  is initiated. Then we remove the link from the page.

  Note: the download attribute capability works only for same-site resources.

  In order to be able to load existing file images, we'll create another 
  button component.
*/

class LoadButton {
  constructor(_, {dispatch}) {
    this.dom = elt("button", {
      onclick: () => startLoad(dispatch)
    }, "📁 Load");
  }
  syncState() {}
}

function startLoad(dispatch) {
  let input = elt("input", {
    type: "file",
    onchange: () => finishLoad(input.files[0], dispatch)
  });
  document.body.appendChild(input);
  input.click();
  input.remove();
}

function finishLoad(file, dispatch) {
  if (file == null) return;
  let reader = new FileReader();
  reader.addEventListener("load", () => {
    let image = elt("img", {
      onload: () => dispatch({
        picture: pictureFromImage(image)
      }),
      src: reader.result
    });
  });
  reader.readAsDataURL(file);
}

/*
  The LoadButton component has an onclick handler that invokes startLoad, which
  is a run of the mill file loading operation. The interesting part is what 
  happens after the file is loaded. There, we create a new image element where
  we'll display our loaded dataURL file. 

  Since we can't get pixel-by-pixel information from an img tag, once the image
  has loaded we run another function to process the pixels and modify the 
  picture property in our state - pictureFromImage.

*/

function pictureFromImage(image) {
  // limit the size of our picture to 100X100 px.
  let width = Math.min(100, image.width);
  let height = Math.min(100, image.height);
  let canvas = elt("canvas", {width, height});
  let cx = canvas.getContext("2d");
  cx.drawImage(image, 0, 0); // draw the image on a new canvas element.
  let pixels = [];
  let {data} = cx.getImageData(0, 0, width, height);
  // getImageData copies the pixel data for a specifed rectangle on the canvas
  // every pixel has four properties - r, g, b, a - combined they reperesent the
  // color of the pixel. The values of each pixel are stored in an array under
  // the data property of the object returned by #getImageData.

  // args: x, y, width, height

  function hex(n) {
    // converts decimal color number to hexademical string.
    // #padStart(length, string) in this case ensures that if the hexademical
    // value is only one character, that we end up with a 2 character string.
    // (necessary for values 0 - 9)
    return n.toString(16).padStart(2, "0"); 
  }
  for (let i = 0; i < data.length; i += 4) {
    let [r, g, b] = data.slice(i, i + 3); // exclude the a value
    pixels.push("#" + hex(r) + hex(g) + hex(b));
  }
  return new Picture(width, height, pixels);
}


/*
  Undo History

  To be able to undo changes, we need to store previous versions of the picture.
  This is made easier for us since picture is an immutable value - but we'll
  have to add an additional field to our application state.

  We'll add a done array to keep these previous permutations. To maintain this
  property we'll have to write a more complicated update function that pushes
  pictures into it.

  We don't want to store every change, only changes a certain amount of time
  apart. To be able to do that, we'll add a second property (doneAt) that 
  records the last time we saved a picture to the done array.
*/

// this VERY CLOSELY resembles a reducer in Redux
function historyUpdateState(state, action) {
  if (action.undo == true) {
    if (state.done.length == 0) return state;
    return Object.assign({}, state, {
      picture: state.done[0],
      done: state.done.slice(1),
      doneAt: 0
    });
  } else if (action.picture &&
             state.doneAt < Date.now() - 1000) {
    // saves the picture object to our done array every second & resets the 
    // doneAt value.
    return Object.assign({}, state, action, {
      done: [state.picture, ...state.done],
      doneAt: Date.now()
    });
  } else {
    // catches all other cases where the payload doesn't contain a picture or
    // undo property.
    return Object.assign({}, state, action);
  }
}

class UndoButton {

  constructor(state, {dispatch}) {
    this.dom = elt("button", {
      onclick: () => dispatch({undo: true}),
      disabled: state.done.length == 0
    }, "⮪ Undo");
  }

  syncState(state) {
    this.dom.disabled = state.done.length == 0;
  }

}


/*
  Let's Draw
*/

const startState = {
  tool: "draw",
  color: "#000000",
  picture: Picture.empty(60, 30, "#f0f0f0"),
  done: [],
  doneAt: 0
};

const baseTools = {draw, fill, rectangle, pick};

const baseControls = [
  ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton
];

function startPixelEditor({state = startState,
                           tools = baseTools,
                           controls = baseControls}) {
  let app = new PixelEditor(state, {
    tools,
    controls,
    dispatch(action) {
      state = historyUpdateState(state, action);
      app.syncState(state);
    }
  });
  return app.dom;
}
