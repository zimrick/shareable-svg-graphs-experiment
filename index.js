
var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');

var server = express();

server.use(morgan('dev')) // or tiny
server.use(express.static(__dirname + '/public'));

server.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

server.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
