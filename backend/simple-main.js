//Do a script to serve a web using node
const express = require('express');
const app = express();

app.use(express.static(__dirname + '../public/'));

app.listen('3000', function() {
  console.log('Server listening on port 3000');
});