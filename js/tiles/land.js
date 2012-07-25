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
      var obj = Object.create(([objects.tree1, objects.tree2])[Math.floor(Simplex.noise2d(y*2, x*2)+1)]).init(this);
      obj.getSubPosition().setX(1/2+Simplex.noise2d(y/2, x/2)/4).setY(1/2+Simplex.noise2d(x/2, y/2)/4);
      this.objects.push(obj);
    }
    
        //for testing purposes only, delete it
    
    if(this.getPosition().getX()== 249 && this.getPosition().getY() == 1021)this.objects=[Object.create(objects.flats1).init(this)];
    if(this.getPosition().getX()== 249 && this.getPosition().getY() == 1022)this.objects=[Object.create(objects.flats2).init(this)];
    if(this.getPosition().getX()== 250 && this.getPosition().getY() == 1021)this.objects=[Object.create(objects.offices1).init(this)];
    if(this.getPosition().getX()== 250 && this.getPosition().getY() == 1022)this.objects=[Object.create(objects.offices2).init(this)];
    if(this.getPosition().getX()== 251 && this.getPosition().getY() == 1022)this.objects=[Object.create(objects.flats2).init(this)];
    if(this.getPosition().getX()== 252 && this.getPosition().getY() == 1021)this.objects=[Object.create(objects.flats2).init(this)];
    if(this.getPosition().getX()== 249 && this.getPosition().getY() == 1019)this.objects=[Object.create(objects.houses2).init(this)];
    if(this.getPosition().getX()== 250 && this.getPosition().getY() == 1019)this.objects=[Object.create(objects.houses1).init(this)];
    if(this.getPosition().getX()== 251 && this.getPosition().getY() == 1021)this.objects=[Object.create(objects.houses2).init(this)];
    if(this.getPosition().getX()== 251 && this.getPosition().getY() == 1019)this.objects=[Object.create(objects.houses2).init(this)];
    if(this.getPosition().getX()== 252 && this.getPosition().getY() == 1019)this.objects=[Object.create(objects.houses1).init(this)];
    if(this.getPosition().getX()== 253 && this.getPosition().getY() == 1019)this.objects=[Object.create(objects.houses1).init(this)];
    if(this.getPosition().getX()== 254 && this.getPosition().getY() == 1019)this.objects=[Object.create(objects.houses2).init(this)];
    
    
    if(this.getPosition().getX()== 247 && this.getPosition().getY() == 1020)this.objects=[Object.create(objects.houses1).init(this)];
    if(this.getPosition().getX()== 247 && this.getPosition().getY() == 1021)this.objects=[Object.create(objects.house2).init(this)];
    if(this.getPosition().getX()== 247 && this.getPosition().getY() == 1022)this.objects=[Object.create(objects.house1).init(this)];
    
    if(this.getPosition().getX()== 247 && this.getPosition().getY() == 1024)this.objects=[Object.create(objects.house1).init(this)];
    if(this.getPosition().getX()== 247 && this.getPosition().getY() == 1025)this.objects=[Object.create(objects.house1).init(this)];
    if(this.getPosition().getX()== 247 && this.getPosition().getY() == 1027)this.objects=[Object.create(objects.house1).init(this)];
    if(this.getPosition().getX()== 247 && this.getPosition().getY() == 1028)this.objects=[Object.create(objects.house1).init(this)];
    
    if(this.getPosition().getX()== 249 && this.getPosition().getY() == 1024)this.objects=[Object.create(objects.flats2).init(this)];
    if(this.getPosition().getX()== 249 && this.getPosition().getY() == 1025)this.objects=[Object.create(objects.flats2).init(this)];
    if(this.getPosition().getX()== 249 && this.getPosition().getY() == 1027)this.objects=[Object.create(objects.houses2).init(this)];
    if(this.getPosition().getX()== 249 && this.getPosition().getY() == 1028)this.objects=[Object.create(objects.houses2).init(this)];
    
    if(this.getPosition().getX()== 263 && this.getPosition().getY() == 1028)this.objects=[Object.create(objects.house1).init(this)];
    if(this.getPosition().getX()== 263 && this.getPosition().getY() == 1026)this.objects=[Object.create(objects.house2).init(this)];
    if(this.getPosition().getX()== 263 && this.getPosition().getY() == 1025)this.objects=[Object.create(objects.house1).init(this)];
    if(this.getPosition().getX()== 263 && this.getPosition().getY() == 1024)this.objects=[Object.create(objects.house1).init(this)];
    if(this.getPosition().getX()== 263 && this.getPosition().getY() == 1022)this.objects=[Object.create(objects.house1).init(this)];
    
    if(this.getPosition().getX()== 251 && this.getPosition().getY() == 1027)this.objects=[Object.create(objects.offices1).init(this)];
    if(this.getPosition().getX()== 251 && this.getPosition().getY() == 1028)this.objects=[Object.create(objects.flats1).init(this)];
    if(this.getPosition().getX()== 252 && this.getPosition().getY() == 1027)this.objects=[Object.create(objects.offices2).init(this)];
    if(this.getPosition().getX()== 252 && this.getPosition().getY() == 1028)this.objects=[Object.create(objects.flats2).init(this)];
    if(this.getPosition().getX()== 253 && this.getPosition().getY() == 1027)this.objects=[Object.create(objects.offices1).init(this)];
    if(this.getPosition().getX()== 253 && this.getPosition().getY() == 1028)this.objects=[Object.create(objects.flats2).init(this)];
    if(this.getPosition().getX()== 254 && this.getPosition().getY() == 1027)this.objects=[Object.create(objects.offices1).init(this)];
    if(this.getPosition().getX()== 254 && this.getPosition().getY() == 1028)this.objects=[Object.create(objects.flats1).init(this)];
    if(this.getPosition().getX()== 255 && this.getPosition().getY() == 1028)this.objects=[Object.create(objects.flats2).init(this)];
    if(this.getPosition().getX()== 255 && this.getPosition().getY() == 1027)this.objects=[Object.create(objects.flats2).init(this)];

    
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