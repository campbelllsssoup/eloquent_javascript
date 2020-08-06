// Exercise 20-3: A Public Space on The Web : DONE FOR NOW...

/*
  Since the file server serves up any kind of file and even includes the right 
  Content-Type header, you can use it to serve a website. Since it allows 
  everybody to delete and replace files, it would be an interesting kind of 
  website: one that can be modified, improved, and vandalized by everybody who 
  takes the time to create the right HTTP request.

  Write a basic HTML page that includes a simple JavaScript file. Put the files 
  in a directory served by the file server and open them in your browser.

  Next, as an advanced exercise or even a weekend project, combine all the 
  knowledge you gained from this book to build a more user-friendly interface 
  for modifying the website—from inside the website.

  Use an HTML form to edit the content of the files that make up the website, 
  allowing the user to update them on the server by using HTTP requests, as 
  described in Chapter 18.

  Start by making only a single file editable. Then make it so that the user 
  can select which file to edit. Use the fact that our file server returns 
  lists of files when reading a directory.

  Don’t work directly in the code exposed by the file server since if you make 
  a mistake, you are likely to damage the files there. Instead, keep your work 
  outside of the publicly accessible directory and copy it there when testing.


  Quitting on this because it's pulling me too far in the weeds. The issue is 
  this:

  1. I've been developing the site as a static HTML page that lives on my
  computer instead of it living on the server. I didn't have the patience to
  figure out how to serve both the HTML page and also send the list of current
  available files (which is used to populate the select tag).

  2. CORS issues when trying to make a PUT request to the server, didn't have
  the patience to hook up the middleware.

  3. Doing my best to uphold the Pareto principle - I MAY come back to this one
  day when I have some time and a healthier perfectionist disposition.
*/
let ROOT = 'http://localhost:8000/';
let editForm = document.querySelector('#edit');
let fileSelect = document.querySelector('#file-select');
let fileContent = document.querySelector('#file-content');
let fileDisplay = document.querySelector('#file-display');
let createBtn = document.querySelector('#create');
let editBtn = document.querySelector('#edit');

createBtn.addEventListener('click', async () => {
  
})

fileSelect.addEventListener('change', (event) => {
  console.log(event.target.value);
})

fetch(ROOT)
  .then(res => res.headers)
  .then(data => {
    console.log(data);
    // let paths = data.split('\n') //.filter(path => path !== 'file_server.js' );
    // console.log(paths);
    // paths.forEach(file => {
    //   fileSelect.innerHTML += `<option value='${file}'>${file}</option>`;
    // });
  });

editBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('Editing...');
});


function writeFile(path, content) {
  return fetch(ROOT + path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'plain/text'
    },
    body: content
  })
}


/*
  Marijn solution

  // Get a reference to the DOM nodes we need
  let filelist = document.querySelector("#filelist");
  let textarea = document.querySelector("#file");

  // This loads the initial file list from the server
  fetch("/").then(resp => resp.text()).then(files => {
    for (let file of files.split("\n")) {
      let option = document.createElement("option");
      option.textContent = file;
      filelist.appendChild(option);
    }
    // Now that we have a list of files, make sure the textarea contains
    // the currently selected one.
    loadCurrentFile();
  });

  // Fetch a file from the server and put it in the textarea.
  function loadCurrentFile() {
    fetch(filelist.value).then(resp => resp.text()).then(file => {
      textarea.value = file;
    });
  }

  filelist.addEventListener("change", loadCurrentFile);

  // Called by the button on the page. Makes a request to save the
  // currently selected file.
  function saveFile() {
    fetch(filelist.value, {method: "PUT",
                          body: textarea.value});
  }



*/