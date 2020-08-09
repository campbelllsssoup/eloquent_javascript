// Exercise 21-1: Disk Persistence : DONE!!!

/*

  The skill-sharing server keeps its data purely in memory. This means that 
  when it crashes or is restarted for any reason, all talks and comments are 
  lost.

  Extend the server so that it stores the talk data to disk and automatically 
  reloads the data when it is restarted. Do not worry about efficiency—do the 
  simplest thing that works.

  Use streams just in case a large amount of data comes through.

*/

const { createReadStream, createWriteStream } = require('fs');
const { pipe, stat } = require('fs').promises;


/* 
  call pipe on the request and provide the the targetStream
  #pipe returns a writable stream. this allows for a chain of pipes, just like
  in shell scripting. Data is automatically managed so that the writeFile
  is never overwhelmed by faster readable streams.

  be sure to catch all errors properly - assume the system will crash if you 
  don't.
*/

// Modifications to skillsharing/skillsharing_server.js

SkillShareServer.prototype.updated = function() {
  this.version++;
  let response = this.talkResponse();
  this.waiting.forEach(resolve => resolve(response));
  this.waiting = [];

  writeFile(dbTalks, JSON.stringify(this.talks), e => {
    if (e) console.log(e);
  });
};



function loadTalks() {
  let json;
  try {
    json = JSON.parse(readFileSync(dbTalks, "utf8"));
  } catch (e) {
    json = {};
  }
  return Object.assign(Object.create(null), json);
}

// console.log(loadTalks())
new SkillShareServer(loadTalks()).start(8000);
