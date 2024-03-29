// start slingin' some d3 here.

var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 50,
  bestScore: 20
};

// axes to set the size of the board and the number of pixels
// axes return functions that map a x or y to the actual board game pixels size
var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
}
//console.log(axes.x(100));

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

// var drag = d3.behavior.drag()
//         .on("drag", function(d,i) {
//             d.x += d3.event.dx
//             d.y += d3.event.dy
//             d3.select(this).attr("transform", function(d,i){
//                 return "translate(" + [ d.x,d.y ] + ")"
//             })
//         });

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
}

function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
  d3.select(this).classed("dragging", false);
}


var player = d3.select("svg")
    .selectAll("circle")
      .data([{"x":200, "y":200}])
    .enter().append("circle")
      .style("fill", "green")
      .attr("class", "player1")
      .attr("r", 5)
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .call(drag);



// Enemy Definitions
// will create an array of enemy data to pass to rendering function
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

var render = function(enemyData) {
  var enemies = gameBoard.selectAll('circle.enemy')
    .data(enemyData, function(d) {
      return d.id
    })

  enemies.enter()
    .append('svg:circle')
    .attr('class', 'enemy')
    .attr('cx', function(enemy) {
      return axes.x(enemy.x)
    })
    .attr('cy', function(enemy) {
      return axes.y(enemy.y)
    })
    .attr('r', 0)

  enemies.exit()
    .remove()

  // skipping for now
  var checkCollision = function(enemy, collidedCallback){
    // blah
  }
  // this just updates the score
  var onCollision = function() {
    // blah
  }

  tweenWithCollisionDetection = function(endData) {
    var enemy = d3.select(this);

    var startPos = {
      x: parseFloat(enemy.attr('cx')),
      y: parseFloat(enemy.attr('cy'))
    }

    var endPos = {
      x: axes.x(endData.x),
      y: axes.y(endData.y)
    }
    console.log(player.attr('cx'))

    return function(t) {
      // checkCollision(enemy, onCollision);
      var enemyNextPos = {
        x: startPos.x + (endPos.x - startPos.x)*t,
        y: startPos.y + (endPos.y - startPos.y)*t
      }
      enemy.attr('cx', enemyNextPos.x)
        .attr('cy', enemyNextPos.y)
    }
  }

  enemies
    .transition()
      .duration(500)
      .attr('r', 10)
    .transition()
      .duration(2000)
      .tween('custom', tweenWithCollisionDetection)
}

var play = function() {

  var gameTurn = function() {

    var newEnemyPositions = createEnemies();
    render(newEnemyPositions);
  }
  var increaseScore = function() {
    gameStats.score += 1;
    updateScore();
  }
  gameTurn();
  setInterval(gameTurn, 2000);
  setInterval(increaseScore, 50);
}

play();
// var enemies = createEnemies();
// console.log(enemies);
// render(enemies);


