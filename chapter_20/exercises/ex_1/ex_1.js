// Exercise 20-1: Search Tool : DONE!!!

/*

  On Unix systems, there is a command line tool called grep that can be used to 
  quickly search files for a regular expression.

  Write a Node script that can be run from the command line and acts somewhat 
  like grep. It treats its first command line argument as a regular expression 
  and treats any further arguments as files to search. It should output the 
  names of any file whose content matches the regular expression.

  When that works, extend it so that when one of the arguments is a directory, 
  it searches through all files in that directory and its subdirectories.

  Use asynchronous or synchronous file system functions as you see fit. Setting 
  things up so that multiple asynchronous actions are requested at the same time 
  might speed things up a little, but not a huge amount, since most file systems 
  can read only one thing at a time.

  Example: 
  
  $ grep root /etc/passwd (original) 
  -> outputs line in the document where a match is found

  $ node ex_1.js [regExp] [...files] (node version) 
  -> outputs name of the file where a match is found

*/

let { readFileSync, readdirSync, statSync } = require('fs');

let exp = new RegExp(process.argv[2]);
let paths = process.argv.slice(3);
let dir = process.cwd();

for (let path of paths) {
  search(path);
}


function search(file) {
  let stats = statSync(file);

  if (stats.isDirectory()) {
    let subFiles = readdirSync(file);
    subFiles = subFiles.map(subFile => file + '/' + subFile);
    // console.log(subFiles);
    subFiles.forEach(subFile => search(subFile));
  } else {
    let txt = readFileSync(file, 'utf8');
    exp.test(txt) && console.log(txt);
    exp.lastIndex = 0;
  }
} 