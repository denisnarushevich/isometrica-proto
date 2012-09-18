define(['./land', 'sprites/roadTileSprite'], function(tile, sprite){
  var road = Object.create(tile);
  
  road.init = function(gridPoints, tiles){
    tile.init.call(this, gridPoints, tiles);
    this.type = 'road';
    this.sprite = Object.create(sprite).setModel(this);
    this.shape = 0;
    this.placing = 0;
    return this;
  };
  
  road.getObjects = function(){
    if (this.objects) return this.objects;
    
    return this.objects = [];
  };
  
  road.getShape = function(){
    if ( this.shape ) return this.shape;
    
    var a = this.tiles.getTile(this.getPosition().getX() + 1, this.getPosition().getY()).getType() == 'road';
    var b = this.tiles.getTile(this.getPosition().getX(), this.getPosition().getY() + 1).getType() == 'road';
    var c = this.tiles.getTile(this.getPosition().getX() - 1, this.getPosition().getY()).getType() == 'road';
    var d = this.tiles.getTile(this.getPosition().getX(), this.getPosition().getY() - 1).getType() == 'road';
    
    
    
    if(a && b && c && d){
      return this.shape = 'x';
    }else if( (a && b && c)  || (b && c && d) || (c && d && a) || (d && a && b) ){
      return this.shape = 't';
    }else if( (a && b) || (b && c) || (c && d) || (d && a) ){
      return this.shape = 'turn';
    }else if( this.getSlopeId() != 2222){
      return this.shape = 'elevation';
    }else{
      return this.shape = 'straight';
    }
    
  };
  
  road.getPlacing = function(){
    var a = this.tiles.getTile(this.getPosition().getX() + 1, this.getPosition().getY()).getType() == 'road';
    var b = this.tiles.getTile(this.getPosition().getX(), this.getPosition().getY() + 1).getType() == 'road';
    var c = this.tiles.getTile(this.getPosition().getX() - 1, this.getPosition().getY()).getType() == 'road';
    var d = this.tiles.getTile(this.getPosition().getX(), this.getPosition().getY() - 1).getType() == 'road';
    
    var shape = this.getShape();
    if ( shape == 'x' ) 
      return this.direction = 1;
    else if ( shape == 'straight' ){
      if(a || c) return this.direction = 1;
      else return this.direction = 2;
    }else if(shape == 't'){
      if(!a)return this.direction = '3';
      else if(!b)return this.direction = '4';
      else if(!c)return this.direction = '1';
      else return this.direction = '2';
    }else if(shape=='turn'){
      if(a&&b)return this.direction = 2;
      else if(b && c)return this.direction = 3;
      else if(c&&d)return this.direction = 1;
      else return this.direction = 4;
    }else if(shape =='elevation'){
      if(this.getSlopeId() == 2233)return this.direction = 1;
      else if(this.getSlopeId() == 2112)return this.direction = 2;
      else if(this.getSlopeId() == 2211)return this.direction = 3;
      else return this.direction = 4;
    }else{
      return this.direction = 1;
    }
  };

  road.update = function(){
    tile.update.call(this);
    
    if ( Math.random() < 1/1000 ) 
      this.spawnObject('car1').travelTo(this.tiles.roads[Math.floor(Math.random()*this.tiles.roads.length)]);
  };

  return road;
});