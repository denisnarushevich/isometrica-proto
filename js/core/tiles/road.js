define(['./land', '../sprites/roadTileSprite'], function(tile, sprite){
  var road = function(gridPoints, tiles){
    tile.call(this, gridPoints, tiles);
    this.type = this._ROAD;
    this.sprite = new sprite(this);
    this.shape = 0;
    this.placing = 0;
    return this;
  }
  
  road.prototype = Object.create(tile.prototype);
  
  
  road.prototype._STRAIGHT = 1;
  road.prototype._TURN = 2;
  road.prototype._T_CROSSING = 3;
  road.prototype._X_CROSSING = 4;
  road.prototype._ELEVATION = 5;
  
  road.prototype.getShape = function(){
    if ( this.shape ) return this.shape;
    
    var pos = this.getPosition();
    var tiles = this.tiles;
    
    var a = tiles.getTile(pos.getX() + 1, pos.getY()).getType() == this._ROAD;
    var b = tiles.getTile(pos.getX(), pos.getY() + 1).getType() == this._ROAD;
    var c = tiles.getTile(pos.getX() - 1, pos.getY()).getType() == this._ROAD;
    var d = tiles.getTile(pos.getX(), pos.getY() - 1).getType() == this._ROAD;
    
    if(a && b && c && d){
      return this.shape = this._X_CROSSING;
    }else if( (a && b && c)  || (b && c && d) || (c && d && a) || (d && a && b) ){
      return this.shape = this._T_CROSSING;
    }else if( (a && b) || (b && c) || (c && d) || (d && a) ){
      return this.shape = this._TURN;
    }else if( this.getSlopeId() != 2222){
      return this.shape = this._ELEVATION;
    }else{
      return this.shape = this._STRAIGHT;
    } 
  }
  
  road.prototype.getPlacing = function(){
    var pos = this.getPosition();
    var tiles = this.tiles;
    
    var a = tiles.getTile(pos.getX() + 1, pos.getY()).getType() == this._ROAD;
    var b = tiles.getTile(pos.getX(), pos.getY() + 1).getType() == this._ROAD;
    var c = tiles.getTile(pos.getX() - 1, pos.getY()).getType() == this._ROAD;
    var d = tiles.getTile(pos.getX(), pos.getY() - 1).getType() == this._ROAD;
    
    var shape = this.getShape();
    if ( shape == this._X_CROSSING ) 
      return this.direction = 1;
    else if ( shape == this._STRAIGHT ){
      if(a || c) return this.direction = 1;
      else return this.direction = 2;
    }else if(shape == this._T_CROSSING){
      if(!a)return this.direction = 3;
      else if(!b)return this.direction = 4;
      else if(!c)return this.direction = 1;
      else return this.direction = 2;
    }else if(shape==this._TURN){
      if(a&&b)return this.direction = 2;
      else if(b && c)return this.direction = 3;
      else if(c&&d)return this.direction = 1;
      else return this.direction = 4;
    }else if(shape == this._ELEVATION){
      if(this.getSlopeId() == 2233)return this.direction = 1;
      else if(this.getSlopeId() == 2112)return this.direction = 2;
      else if(this.getSlopeId() == 2211)return this.direction = 3;
      else return this.direction = 4;
    }else{
      return this.direction = 1;
    }
  };

  road.prototype.getObjects = function(){
    if (this.objects) return this.objects;
    
    return this.objects = [];
  };

  road.prototype.update = function(){
    tile.prototype.update.call(this);
    
    if ( Math.random() < 1/1000 ) 
      this.spawnObject('car1').travelTo(this.tiles.roads[Math.floor(Math.random()*this.tiles.roads.length)]);
  };
  
  return road;
});