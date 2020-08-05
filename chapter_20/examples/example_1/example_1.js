let { readFile } = require('fs');

readFile("file.txt", 'utf8', (error, text) => {
  if (error) throw error;
  console.log("The file contains:", text);
});


/* 
  It seems that with examples 1 & 2, the target file is relative to your cwd.

  
*/