
var d3 = require('d3');

// Start here...
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM content loaded');

  var width = 600;
  var height = 300;

  var vis = d3.select('#visualization');
  var svg = vis.append('svg')
               .attr('width', width)
               .attr('height', height);



});
