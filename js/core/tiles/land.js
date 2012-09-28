define(['./tile', '../objects', 'lib/simplex/simplex'], function(tile, objects, Simplex){
  var land = function(gridPoints, tiles){
    tile.call(this, gridPoints, tiles); //calling parent constructor
    this.type = this._LAND;
  }
  
  land.prototype = Object.create(tile.prototype);
  
  land.prototype.getObjects = function(){
    if (this.objects) return this.objects;
    
    tile.prototype.getObjects.call(this);
    
    //return generated tree
    var tree = 0, x = this.getPosition().getX(), y = this.getPosition().getY();
		
    tree += Simplex.noise2d(x, y);
    if(tree > 0 && this.getTerrain() == 'grass'){
      var obj = [ new objects.tree1(this) , new objects.tree2(this) ][Math.floor(Simplex.noise2d(y*2, x*2)+1)];
      obj.getSubPosition().setX(1/2+Simplex.noise2d(y/2, x/2)/4).setY(1/2+Simplex.noise2d(x/2, y/2)/4);
      this.objects.push(obj);
    }
 
     if(this.getPosition().getX()== 249 && this.getPosition().getY() == 1021)this.objects=[new objects.flats1(this)];
    if(this.getPosition().getX()== 249 && this.getPosition().getY() == 1022)this.objects=[new objects.flats2(this)];
    if(this.getPosition().getX()== 250 && this.getPosition().getY() == 1021)this.objects=[new objects.offices1(this)];
    if(this.getPosition().getX()== 250 && this.getPosition().getY() == 1022)this.objects=[new objects.offices2(this)];
    if(this.getPosition().getX()== 251 && this.getPosition().getY() == 1022)this.objects=[new objects.flats2(this)];
    if(this.getPosition().getX()== 252 && this.getPosition().getY() == 1021)this.objects=[new objects.flats2(this)];
    if(this.getPosition().getX()== 249 && this.getPosition().getY() == 1019)this.objects=[new objects.houses2(this)];
    if(this.getPosition().getX()== 250 && this.getPosition().getY() == 1019)this.objects=[new objects.houses1(this)];
    if(this.getPosition().getX()== 251 && this.getPosition().getY() == 1021)this.objects=[new objects.houses2(this)];
    if(this.getPosition().getX()== 251 && this.getPosition().getY() == 1019)this.objects=[new objects.houses2(this)];
    if(this.getPosition().getX()== 252 && this.getPosition().getY() == 1019)this.objects=[new objects.houses1(this)];
    if(this.getPosition().getX()== 253 && this.getPosition().getY() == 1019)this.objects=[new objects.houses1(this)];
    if(this.getPosition().getX()== 254 && this.getPosition().getY() == 1019)this.objects=[new objects.houses2(this)];
    
    if(this.getPosition().getX()== 251 && this.getPosition().getY() == 1030)this.objects=[new objects.houses2(this)];
    if(this.getPosition().getX()== 252 && this.getPosition().getY() == 1030)this.objects=[new objects.houses1(this)];
    if(this.getPosition().getX()== 253 && this.getPosition().getY() == 1030)this.objects=[new objects.houses1(this)];
    if(this.getPosition().getX()== 254 && this.getPosition().getY() == 1030)this.objects=[new objects.houses2(this)];
    if(this.getPosition().getX()== 255 && this.getPosition().getY() == 1030)this.objects=[new objects.houses1(this)];
    if(this.getPosition().getX()== 257 && this.getPosition().getY() == 1030)this.objects=[new objects.houses2(this)];
    if(this.getPosition().getX()== 259 && this.getPosition().getY() == 1030)this.objects=[new objects.houses1(this)];
    if(this.getPosition().getX()== 258 && this.getPosition().getY() == 1030)this.objects=[new objects.houses2(this)];
    
    if(this.getPosition().getX()== 247 && this.getPosition().getY() == 1020)this.objects=[new objects.houses1(this)];
    if(this.getPosition().getX()== 247 && this.getPosition().getY() == 1021)this.objects=[new objects.house2(this)];
    if(this.getPosition().getX()== 247 && this.getPosition().getY() == 1022)this.objects=[new objects.house1(this)];
    
    if(this.getPosition().getX()== 247 && this.getPosition().getY() == 1024)this.objects=[new objects.house1(this)];
    if(this.getPosition().getX()== 247 && this.getPosition().getY() == 1025)this.objects=[new objects.house1(this)];
    if(this.getPosition().getX()== 247 && this.getPosition().getY() == 1027)this.objects=[new objects.house1(this)];
    if(this.getPosition().getX()== 247 && this.getPosition().getY() == 1028)this.objects=[new objects.house1(this)];
    
    if(this.getPosition().getX()== 249 && this.getPosition().getY() == 1024)this.objects=[new objects.flats2(this)];
    if(this.getPosition().getX()== 249 && this.getPosition().getY() == 1025)this.objects=[new objects.flats2(this)];
    if(this.getPosition().getX()== 249 && this.getPosition().getY() == 1027)this.objects=[new objects.houses2(this)];
    if(this.getPosition().getX()== 249 && this.getPosition().getY() == 1028)this.objects=[new objects.houses2(this)];
    
    if(this.getPosition().getX()== 263 && this.getPosition().getY() == 1028)this.objects=[new objects.house1(this)];
    if(this.getPosition().getX()== 263 && this.getPosition().getY() == 1026)this.objects=[new objects.house2(this)];
    if(this.getPosition().getX()== 263 && this.getPosition().getY() == 1025)this.objects=[new objects.house1(this)];
    if(this.getPosition().getX()== 263 && this.getPosition().getY() == 1024)this.objects=[new objects.house1(this)];
    if(this.getPosition().getX()== 263 && this.getPosition().getY() == 1022)this.objects=[new objects.house1(this)];
    
    if(this.getPosition().getX()== 251 && this.getPosition().getY() == 1027)this.objects=[new objects.offices1(this)];
    if(this.getPosition().getX()== 251 && this.getPosition().getY() == 1028)this.objects=[new objects.flats1(this)];
    if(this.getPosition().getX()== 252 && this.getPosition().getY() == 1027)this.objects=[new objects.offices2(this)];
    if(this.getPosition().getX()== 252 && this.getPosition().getY() == 1028)this.objects=[new objects.flats2(this)];
    if(this.getPosition().getX()== 253 && this.getPosition().getY() == 1027)this.objects=[new objects.offices1(this)];
    if(this.getPosition().getX()== 253 && this.getPosition().getY() == 1028)this.objects=[new objects.flats2(this)];
    if(this.getPosition().getX()== 254 && this.getPosition().getY() == 1027)this.objects=[new objects.offices1(this)];
    if(this.getPosition().getX()== 254 && this.getPosition().getY() == 1028)this.objects=[new objects.flats1(this)];
    if(this.getPosition().getX()== 255 && this.getPosition().getY() == 1028)this.objects=[new objects.flats2(this)];
    if(this.getPosition().getX()== 255 && this.getPosition().getY() == 1027)this.objects=[new objects.flats2(this)];
    
    if(this.getPosition().getX()== 255 && this.getPosition().getY() == 1021)this.objects=[new objects.flats2(this)];
    if(this.getPosition().getX()== 255 && this.getPosition().getY() == 1022)this.objects=[new objects.flats1(this)];
    if(this.getPosition().getX()== 254 && this.getPosition().getY() == 1021)this.objects=[new objects.flats1(this)];
    if(this.getPosition().getX()== 254 && this.getPosition().getY() == 1022)this.objects=[new objects.flats2(this)];
    
    if(this.getPosition().getX()== 257 && this.getPosition().getY() == 1022)this.objects=[new objects.flats2(this)];
    if(this.getPosition().getX()== 257 && this.getPosition().getY() == 1023)this.objects=[new objects.offices2(this)];
    if(this.getPosition().getX()== 257 && this.getPosition().getY() == 1025)this.objects=[new objects.offices1(this)];
    if(this.getPosition().getX()== 257 && this.getPosition().getY() == 1026)this.objects=[new objects.flats1(this)];
    if(this.getPosition().getX()== 257 && this.getPosition().getY() == 1027)this.objects=[new objects.flats1(this)];
    if(this.getPosition().getX()== 257 && this.getPosition().getY() == 1028)this.objects=[new objects.flats1(this)];
    
    if(this.getPosition().getX()== 258 && this.getPosition().getY() == 1023)this.objects=[new objects.flats2(this)];
    if(this.getPosition().getX()== 258 && this.getPosition().getY() == 1026)this.objects=[new objects.flats1(this)];
    if(this.getPosition().getX()== 258 && this.getPosition().getY() == 1027)this.objects=[new objects.flats1(this)];
    if(this.getPosition().getX()== 258 && this.getPosition().getY() == 1028)this.objects=[new objects.flats2(this)];
    
    if(this.getPosition().getX()== 259 && this.getPosition().getY() == 1021)this.objects=[new objects.house1(this)];
    if(this.getPosition().getX()== 259 && this.getPosition().getY() == 1024)this.objects=[new objects.houses1(this)];
    if(this.getPosition().getX()== 259 && this.getPosition().getY() == 1026)this.objects=[new objects.houses1(this)];
    if(this.getPosition().getX()== 259 && this.getPosition().getY() == 1028)this.objects=[new objects.houses2(this)];
    
    if(this.getPosition().getX()== 260 && this.getPosition().getY() == 1021)this.objects=[new objects.house2(this)];
    if(this.getPosition().getX()== 260 && this.getPosition().getY() == 1022)this.objects=[new objects.house1(this)];
    if(this.getPosition().getX()== 261 && this.getPosition().getY() == 1021)this.objects=[new objects.house2(this)];
    if(this.getPosition().getX()== 261 && this.getPosition().getY() == 1023)this.objects=[new objects.house1(this)];
    
    return this.objects;
  }
  
  land.prototype.getTerrain = function(){
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
  }
  
  return land;
});