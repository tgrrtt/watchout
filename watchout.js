// start slingin' some d3 here.

var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
}


/* Yet to use*/
var gameStats = {
  score: 0,
  bestScore: 0
}

// axes to set the size of the board and the number of pixels
var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
}

var gameBoard = d3.select('.container')
    .append('svg:svg')
    .attr('width', gameOptions.width)
    .attr('height', gameOptions.height)
