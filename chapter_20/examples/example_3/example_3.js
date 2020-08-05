const { readFile } = require('fs').promises;

readFile("file.txt", 'utf8')
  .then(console.log);