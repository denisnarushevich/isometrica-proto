define(['astar/astar'], function(astar){
  var pathFinder = Object.create(astar);
  
  pathFinder.isWall = function(x, y){
    var t = g.logic.world.tiles.getTile(x, y);
    return t.getType() != 'road';
  };
  
  pathFinder.find = function(sourceTile, destinationTile){
    var nodes = astar.search.call(this, sourceTile.getPosition().getX(), sourceTile.getPosition().getY(), destinationTile.getPosition().getX(), destinationTile.getPosition().getY());
    var path = [];
    for(var i in nodes){
      path.push(g.logic.world.tiles.getTile(nodes[i].x, nodes[i].y));
    }
    return path;
  };
  
  return g.a = pathFinder;
});