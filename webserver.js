const http = require("http");
const server = http.createServer(handler);
const fs = require("fs");
const path = require("path");
const io = require("socket.io")(server);
const OSC = require("osc-js");

const port = process.argv[2] || 8080;

server.listen(parseInt(port, 10));

function handler(req, res) {
  console.log("request", req.url);

  let filePath = req.url;
  if (filePath == "/") {
    filePath = "/index.html";
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json"
  };

  const contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(__dirname + "/client/build" + filePath, function(err, content) {
    console.log(__dirname + "/client/build" + filePath);
    if (err) {
      if (err.code == "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("404 not found \n");
        res.end();
        return;
      } else {
        res.writeHead(500);
        res.end(
          "Sorry, check with the site admin for error: " + err.code + "..\n"
        );
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      console.log("contentType", contentType);
      return res.end(content);
    }
  });
}

console.log("--- Static file server running at port: " + port + " ---");

/**** sockets and OSC ***/

const options = {
  open: { host: "127.0.0.1", port: 8080 },
  send: { host: "127.0.0.1", port: 8080 }
};

const osc = new OSC({
  plugin: new OSC.DatagramPlugin(options)
});

osc.open();

osc.on("open", () => {
  console.log("--- Node Osc Server started successfully --- ");
});

io.sockets.on("connection", function(socket) {
  console.log("--- Socket connected ---");
  socket.on("connect", function() {
    console.log("--- user connected ---");
  });

  socket.on("disconnect", function() {
    console.log("--- user disconnected ---");
  });

  //used in /keyboard endpoint
  socket.on("keyPress", function(data) {
    console.log("--- key press received by socket ---", data);
    osc.send(new OSC.Message(`/keyboard/${data}/`, 1));
  });

  //used in shaderParams endpoint
  socket.on("sliderChange", function(data) {
    const { paramName, value } = data;
    console.log(
      `--- sliderChange received by socket: ${paramName} received. value: ${value}`
    );
    osc.send(new OSC.Message(`/${paramName}/`, value));
  });
});

setInterval(
  () =>
    server.getConnections((err, connections) =>
      console.log(`${connections} connections currently open`)
    ),
  1000
);

//https://stackoverflow.com/questions/43003870/how-do-i-shut-down-my-express-server-gracefully-when-its-process-is-killed

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

let connections = [];

server.on("connection", connection => {
  connections.push(connection);
  connection.on(
    "close",
    () => (connections = connections.filter(curr => curr !== connection))
  );
});

function shutDown() {
  console.log("Received kill signal, shutting down gracefully");
  osc.send(new OSC.Message(`/shutdown`, 1));
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}
