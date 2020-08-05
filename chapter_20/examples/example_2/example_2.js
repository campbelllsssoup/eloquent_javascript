const { writeFile } = require('fs');

writeFile('graffiti.txt', 'Node was here', err => {
  if (err) console.log(`Failed to write file: ${err}`);
  else console.log("File written.");
})