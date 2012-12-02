define(['lib/astar/astar'], function(astar){
  var pathFinder = Object.create(astar);
  
  pathFinder.findPath = function(sourceTile, destinationTile, isWall){
    var tiles = sourceTile.tiles;
    var nodes = astar.search.call(this, sourceTile.getPosition().getX(), sourceTile.getPosition().getY(), destinationTile.getPosition().getX(), destinationTile.getPosition().getY(), function(node){
      return isWall(tiles.getTile(node.x, node.y));
    }, function(node){
      return tiles.getTile(node.x, node.y).getSlopeId() == 2222 ? 1 : 2;
    });
    
    var path = [];
    for(var i in nodes){
      path.push(tiles.getTile(nodes[i].x, nodes[i].y));
    }
    return path;
  };
  
  return pathFinder;
});