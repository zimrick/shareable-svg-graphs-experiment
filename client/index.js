
var d3 = require('d3');
var request = require('superagent');

// Start here...
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM content loaded');

  var width = 600;
  var height = 300;

  var vis = d3.select('#visualization');
  var svg = vis.append('svg')
               .attr('width', width)
               .attr('height', height);

  var g = svg.append('g');

  var circle = g.append('circle')
                .attr('cx', 60)
                .attr('cy', 60)
                .attr('r', 20)
                .attr('fill', '#00adee');

  var btn = document.getElementById('converter');

  btn.addEventListener('click', function() {
    convertSVG();
  });
});

function convertSVG() {
  document.querySelector('#response').innerHTML = '<p>Generating shareable image of your graph.</p>';

  var svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var DOMURL = self.URL || self.webkitURL || self;

  var img = new Image();
  var svg = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
  var url = DOMURL.createObjectURL(svg);

  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    var png = canvas.toDataURL('image/png');
    saveSVG(png);
    DOMURL.revokeObjectURL(png);
    // document.querySelector('#png-container').innerHTML = '<img src="'+png+'"/>';
  };

  img.src = url;
}

function saveSVG(imgData) {
  request.post('/upload')
    .set('Content-Type', 'application/json')
    .send({ img: imgData })
    .end(function(err, res) {
      if(err) console.log(err);
      else renderImg(JSON.parse(res.text));
    });
}

function renderImg(img) {
  document.querySelector('#response').innerHTML = '<p>The shareable image of your graph is here: <a href="http://' + window.location.hostname + ':' + window.location.port + img.src + '" download>http://' + window.location.hostname + ':' + window.location.port + img.src + '</a></p>';
  // document.querySelector('#png-container').innerHTML = '<img src="' + img.src + '" />';
}
