define(['./tile', 'objects'], function(tile, objects){
  var land = Object.create(tile);
  
  land.init = function(gridPoints){
    tile.init.call(this, gridPoints);
    this.type = 'land';
    return this;
  };  
  
  land.getObjects = function(){
    if (this.objects) return this.objects;
    
    tile.getObjects.call(this);
    
    //return generated tree
    var tree = 0, x = this.getPosition().getX(), y = this.getPosition().getY();
		
    tree += Simplex.noise2d(x, y);
		
    if(tree > 0 && this.getTerrain() == 'grass'){
      var obj = objects.create('tree1').setX(x).setY(y);
      this.objects.push(obj);
    }
    
    return this.objects;
  };
  
  land.getTerrain = function(){
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

  return land;
});