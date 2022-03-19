//Do a script to serve a web using node
const express = require('express');
const app = express();
//Serves the contend of the folder frontend
app.use(express.static(__dirname + '../../frontend/'));

app.listen('3000', function() {
  console.log('Server listening on port 3000');
});