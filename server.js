let express = require('express');
let path = require('path');
let serveStatic = require('serve-static');


console.log("Initializing app.");
app = express();
app.use(serveStatic(__dirname + "/dist"));

let port = process.env.PORT || 8080;
console.log(`$PORT set to ${port}`);
app.listen(port);

console.log(`Server started on ${port}.`);
