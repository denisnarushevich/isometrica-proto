define(['point', 'simplex', 'objects', 'sprites/tileSprite'], function(point, simplex, objects, tileSprite){
  var tile = Object.create(point);
  
  tile.init = function(x, y){
    this.setCoordinates({x: x, y: y});
    this.objects = [];
    this.sprite = Object.create(tileSprite).setTile(this);
      
    this.gridPoints= null;
    this.slopeId= null;
    this.shore= null;
    this.water= null;
    this.terrain = null;
      
    return this;
  };
  
  tile.update = function(){
    var objects = this.getObjects();
    for(var i in objects){
      objects[i].update();
    }
    return this;
  };
  
  tile.getZ = function(){
    return this.isWater() ? g.logic.world.waterLevel : this.getGridPoints()[0].getZ();
  };
  
  tile.getGridPoints = function(){
    if (this.gridPoints) return this.gridPoints;
		
    var grid = g.logic.world.grid, x = this.getX(), y = this.getY();
    
    //gridpoints start count from tiles left (West corner);
    return this.gridPoints = [ 
      grid.getPoint(x, y),
      grid.getPoint(x, y + 1),
      grid.getPoint(x + 1, y + 1),
      grid.getPoint(x + 1, y)
    ];
  };
  
  tile.getSlopeId = function(){
    if (this.slopeId) return this.slopeId;
		
    if (this.isWater()) return this.slopeId = 2222;
		
    var gridPoints = this.getGridPoints();
    return this.slopeId = 2000 + (gridPoints[1].getZ() - gridPoints[0].getZ() + 2) * 100 + (gridPoints[2].getZ() - gridPoints[0].getZ() + 2) * 10 + (gridPoints[3].getZ() - gridPoints[0].getZ() + 2);
  };
  
  tile.isShore = function(){
    if (this.shore != null) return this.shore;
		
    var wLevel = g.logic.world.waterLevel;
    var gridPoints = this.getGridPoints();
		
    return this.shore = ( !this.isWater() && (gridPoints[0].getZ() == wLevel || gridPoints[1].getZ() == wLevel || gridPoints[2].getZ() == wLevel || gridPoints[3].getZ() == wLevel) );
  };
  
  tile.isWater = function(){
    if ( this.water ) return this.water;
		
    var gridPoints = this.getGridPoints();
		
    return this.water = ( ( gridPoints[0].getZ() + gridPoints[1].getZ() + gridPoints[2].getZ() + gridPoints[3].getZ() ) / 4 <= g.logic.world.waterLevel );
  };
  
  tile.getTerrain = function(){
    if ( this.terrain ) return this.terrain;
    
    var terrain;
    
    if ( this.isWater() ) {
      if ( this.getGridPoints()[0].getZ() >= -1 ) terrain = 'water';
      else terrain = 'deepwater';
    } else {
      //terrain = (['grass', 'oldgrass'])[Math.round(Math.random())];
      terrain = 'grass';
    }
    
    return this.terrain = terrain;
    /*else{
      var sand = 0, x = this.x, y = this.y;

      sand += Simplex.noise2d(x / 512, y / 512) / 2;
      sand += Simplex.noise2d(x / 256, y / 256) / 4;
      sand += Simplex.noise2d(x / 128, y / 128) / 8;
      sand += Simplex.noise2d(x / 64, y / 64) / 16;
      sand += Simplex.noise2d(x / 32, y / 32) / 32;
      sand += Simplex.noise2d(x / 16, y / 16) / 32;

      sand *= Simplex.noise2d(x / 4096, y/ 4096);

      if (sand > 0.1) return this.terrain = 'sand';
      else if(sand <= 0.1 && sand > 0.09) return this.terrain = 'oldgrass';
      else{
        var oldgrass = 0, x = -this.x, y = -this.y;

        oldgrass += Simplex.noise2d(x / 32, y / 32) / 2;
        oldgrass += Simplex.noise2d(x / 16, y / 16) / 4;
        oldgrass += Simplex.noise2d(x / 8, y / 8) / 8;
        oldgrass += Simplex.noise2d(x / 4, y / 4) / 8;

        oldgrass *= Simplex.noise2d(x / 256, y / 256);
				
        if (oldgrass > 0.1) return this.terrain = 'oldgrass'
        else return this.terrain = 'grass';
      }
    }*/
  };
  
  tile.getObjects = function(){
    if (this.objects.length) return this.objects;
    
    //return generated tree
    var tree = 0, x = this.x, y = this.y;
		
    tree += Simplex.noise2d(x, y);
		
    if(tree > 0 && !this.isWater() && this.getTerrain() == 'grass' && !this.isShore()){
      var obj = objects.create('tree1').setCoordinates(this.getCoordinates());
      this.objects.push(obj);
    }
    return this.objects;
  };
  
  tile.addObject = function(object){
    this.getObjects().push(object);
    return this;
  };
  
  tile.removeObject = function(object){
    for(var key in this.objects){
      var otherObject = this.objects[key];
      if(otherObject == object){
        delete this.objects[key];
          
        //filling empty place with some other object, from same array
        if(otherObject = this.objects.pop())
          this.objects[key] = otherObject;
          
        break;
      }
    }
    return this;
  };
  
  tile.spawnObject = function(name){
    var object = objects.create(name).setCoordinates(this.getCoordinates());
    this.objects.push(object);
    return object;
  };
  
  tile.getSprite = function(){
    return this.sprite;
  }
  
  return tile;
});