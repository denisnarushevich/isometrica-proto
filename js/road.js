define(function(){
  var road = {};
  
  road.tile = null;
  road.shape = null;
  
  road.getShape = function(){
    if ( this.shape ) return this.shape;
    
    var x = this.getTile().getX();
    var y = this.getTile().getY();
    
    var tiles = g.logic.world.tiles;
    
    var a = tiles.getTile(x-1,y).isRoad() ? 1 : 0;
    var b = tiles.getTile(x,y+1).isRoad() ? 1 : 0;
    var c = tiles.getTile(x+1,y).isRoad() ? 1 : 0;
    var d = tiles.getTile(x,y-1).isRoad() ? 1 : 0;
    
    var id = '' + a + b + c + d;
    
    return this.shape = id;
  };
  
  road.getTile = function(){
    return this.tile;
  };
  
  road.setTile = function(tile){
    this.tile = tile
    return this;
  };
});