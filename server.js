let express = require('express');
let path = require('path');
let serveStatic = require('serve-static');
let morgan = require('morgan');


console.log("Initializing app.");
app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use(morgan('combined'));

let port = process.env.PORT || 8080;
console.log(`$PORT set to ${port}`);
app.listen(port);

console.log(`Server started on ${port}.`);
