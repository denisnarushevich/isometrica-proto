define(['simplex', 'objects', 'sprites/tileSprite'], function(simplex, objects, tileSprite){
  var tile = Object.create();
  
  tile.init = function(gridPoints){
    this.objects = []; ///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! after finishing post, please,set this to null and change getObject func.
    this.sprite = Object.create(tileSprite).setModel(this);
      
    this.gridPoints = gridPoints;
    this.slopeId = null;
    this.terrain = null;
      
    this.type = null;
      
    return this;
  };
  
  tile.update = function(){
    var objects = this.getObjects();
    for(var i in objects){
      objects[i].update();
    }
    return this;
  };
  
  tile.getGridPoints = function(){
    return this.gridPoints;
  };
  
  tile.getPosition = function(){
    return this.getGridPoints()[0];
  }
  
  tile.getSlopeId = function(){
    if ( this.slopeId ) return this.slopeId;
		
    var gridPoints = this.getGridPoints();
    return this.slopeId = 2000 + (gridPoints[1].getZ() - gridPoints[0].getZ() + 2) * 100 + (gridPoints[2].getZ() - gridPoints[0].getZ() + 2) * 10 + (gridPoints[3].getZ() - gridPoints[0].getZ() + 2);
  };
  
  tile.getTerrain = function(){
    if ( this.terrain ) return this.terrain;
    
    return this.terrain = 'grass';
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
      var obj = objects.create('tree1').setX(this.getX()).setY(this.getY());
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
    var object = objects.create(name).setX(this.getX()).setY(this.getY()).setZ(this.getZ());
    this.objects.push(object);
    return object;
  };
  
  tile.getSprite = function(){
    return this.sprite;
  }
  
  return tile;
});