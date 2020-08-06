const { createServer } = require("http");

const methods = Object.create(null);

createServer((request, response) => {
  let handler = methods[request.method] || notAllowed;
  handler(request)
    .catch(error => {
      if (error.status != null) return error;
      return {body: String(error), status: 500};
    })
    .then(({body = '', status = 200, type = "text/plain", headers = {}}) => {
       response.writeHead(status, {
         "Content-Type": type,
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'GET,HEAD,PUT,DELETE',
         ...headers
       });
       if (body && body.pipe) {
         body.pipe(response)
       }
       else response.end(body);
    });
}).listen(8000);

async function notAllowed(request) {
  return {
    status: 405,
    body: `Method ${request.method} not allowed.`
  };
}

const { parse } = require("url");
const { resolve, sep } = require("path");
const baseDirectory = process.cwd();

function urlPath(url) {
  let { pathname } = parse(url);
  let path = resolve(decodeURIComponent(pathname).slice(1));
  if (path != baseDirectory &&
      !path.startsWith(baseDirectory + sep)) {
    throw {status: 403, body: "Forbidden"};
  }
  return path;
}

const { createReadStream } = require("fs");
const { stat, readdir } = require("fs").promises;
const mime = require("mime");

methods.GET = async function(request) {
  let path = urlPath(request.url);
  let stats;
  try {
    console.log(request.url);
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    else return {status: 404, body: "File not found"};
  }
  if (stats.isDirectory()) {
    return {body: (await readdir(path)).join("\n")};
  } else {
    return {body: createReadStream(path),
            type: mime.getType(path)};
  }
};

const { rmdir, unlink } = require("fs").promises;

methods.DELETE = async function(request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    else return {status: 204};
  }
  if (stats.isDirectory()) await rmdir(path); // removes directories
  else await unlink(path); // removes files
  return {status: 204}; // 204 - No Content
};

const { createWriteStream } = require("fs");

function pipeStream(from, to) {
  return new Promise((resolve, reject) => {
    from.on("error", reject);
    to.on("error", reject);
    to.on("finish", resolve);
    from.pipe(to);
  });
}

methods.PUT = async function(request) {
  console.log("Now we're PUTTing...");
  let path = urlPath(request.url);
  await pipeStream(request, createWriteStream(path));
  return {status: 204};
};

const { mkdir } = require('fs').promises;

methods.MKCOL = async function(request) {
  let respObj = {};
  try {
    await mkdir(urlPath(request.url), {});
  } catch (error) {
    respObj.body = 'ERROR: This directory already exists.';
  }
  return respObj;
}

exports.methods = methods;
exports.urlPath = urlPath;
