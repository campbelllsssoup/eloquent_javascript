const { request } = require("http");
request({
  hostname: "localhost",
  port: 8000,
  method: "POST"
}, response => {
  response.on("data", chunk =>
    process.stdout.write(chunk.toString())
    // console.log(chunk.toString())
  );
  response.on('finish', () => {
    process.stdout.write('\n');
  })
}).end("Hello server");