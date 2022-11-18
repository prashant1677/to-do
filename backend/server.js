const app = require("./apps");
// const debug = require("debug")("node-angular");
const http = require("http");

const port = process.env.PORT || 3000;

app.set('port',port);

const server = http.createServer(app);
// server.on("error", onError);
// server.on("listening", onListening);
server.listen(port);
// app.listen(port)
// server.listen(port);

console.log("Backend server started on PORT::"+port);