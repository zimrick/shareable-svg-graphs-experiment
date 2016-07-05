
var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var fs = require('fs');

var server = express();

server.use(morgan('dev')) // or tiny

server.use(express.static(__dirname + '/public'));
server.use(favicon(__dirname + '/public/img/favicon.ico'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.post('/upload', function(req, res) {
  var base64Data = req.body.img.replace(/^data:image\/png;base64,/, '');
  var targetDirectory = __dirname + '/public/img/';

  fs.writeFile(targetDirectory + 'visualization.png', base64Data, 'base64', function(err) {
    if(err) res.send(err);
    else {
      // Artifial delay of the server to make it a bit more realistic...
      setTimeout(function () {
        res.send({ src: '/img/visualization.png'});
      }, 300);
    }
  });
});

server.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

var port = 3000;

server.listen(port, function() {
  console.log('Server is listening on port 3000');
});
