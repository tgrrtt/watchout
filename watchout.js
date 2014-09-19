// start slingin' some d3 here.

var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};


/* Yet to use*/
var gameStats = {
  score: 50,
  bestScore: 20
};

// axes to set the size of the board and the number of pixels
var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
}

var gameBoard = d3.select('.container')
  .append('svg:svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height)

var updateScore = function(){
  d3.select('.current-score span')
    .text(gameStats.score.toString())
};

var updateBestScore = function () {
  gameStats.bestScore = Math.max(gameStats.bestScore, gameStats.score);
  d3.select(".high-score span").text(gameStats.bestScore.toString());
}

// Player definition
// skipping player for now


// Enemy Definitions

var createEnemies = function () {
  var counter = gameOptions.nEnemies;
  var enemyArray = [];
  for (var i = 0; i < gameOptions.nEnemies; i++) {
    var aEnemy = {
      id: i,
      x: Math.random()*100,
      y: Math.random()*100
    };
    enemyArray.push(aEnemy);
  }
  return enemyArray;
}

console.log(createEnemies());
