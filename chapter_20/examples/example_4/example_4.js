const { readFileSync } = require('fs');

console.log("The file contains: ", readFileSync("file.txt", 'utf8'));