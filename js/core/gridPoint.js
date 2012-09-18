define(['./vector3', 'lib/simplex/simplex'], function(point, Simplex){
  var gridPoint = Object.create(point);
  
  gridPoint.grid = null;
  
  gridPoint.z0 = null; //pure grid point value, without added waterLevel
  gridPoint.w = null; //water height\depth on given tile
  
  gridPoint.setGrid = function(grid){
    this.grid = grid;
    return this;
  }
  
  //get point of grid, with set height. slopes of terrain shouldnt exceed 45 degrees.
  //This realisation is using many octaves, to have realistic view of terrain contour, coastline.
  //but because at the same time we need it to have smooth slopec <45Deg, there's a drawback - its too flat
  //height varies only from -16 to 16. can't afford anymore, because then there will be cliffs.
  //it would be good to invent something better then this aproach, with smooth slopes  and different landscape
  gridPoint.getZ0 = function(){
    var x = this.getX();
    var y = this.getY();

    if ( typeof(this.z0) == 'number' ) return this.z0;
    else if ( x % 1  || y % 1 ) {
      var x0 = Math.floor(x), y0 = Math.floor(y);
             
      var p1 = this.grid.getPoint(x0, y0).getZ();
      var p2 = this.grid.getPoint(x0, y0 + 1).getZ();
      var p3 = this.grid.getPoint(x0 + 1, y0).getZ();
      var p4 = this.grid.getPoint(x0 + 1, y0 + 1).getZ();
 
      var xf = Math.abs(x % 1);
      var yf = Math.abs(y % 1);
       
      var i1,i2; //linear interpol
       
      if(x<0){
        i1 = p3 * (1-xf) + p1 * xf;
        i2 = p4 * (1-xf) + p2 * xf;
      }else{
        i1 = p1 * (1-xf) + p3 * xf;
        i2 = p2 * (1-xf) + p4 * xf;
      }
      
      if(y<0)
        this.z0 = i2 * (1-yf) + i1 * yf; 
      else
        this.z0 = i1 * (1-yf) + i2 * yf; 
    } else {
      var land = 0, island = 0;

      land += Simplex.noise2d(x / 512, y / 512) / 2; //noisemap of continets
      land += Simplex.noise2d(x / 256, y / 256) / 4; //of smaler lands
      land += Simplex.noise2d(x / 128, y / 128) / 8;  //...
      land += Simplex.noise2d(x / 64, y / 64) / 16; //...
      land += Simplex.noise2d(x / 32, y / 32) / 32; //...
      land += Simplex.noise2d(x / 16, y / 16) / 64; //...
      land += Simplex.noise2d(x / 8, y / 8) / 64; //small details

      island += Simplex.noise2d(x / 64, y / 64) / 10;
      island += Simplex.noise2d(x / 32, y / 32) / 20;
      island += Simplex.noise2d(x / 16, y / 16) / 40;
      island += Simplex.noise2d(x / 8, y / 8) / 40;

      this.z0 = Math.floor( (0.8*land + 0.2*island) * 16 );
    }
    
    return this.z0;
  };
  
  //water depth on given point
  gridPoint.getW = function(){
    if ( typeof(this.w) == 'number' ) return this.w;
    
    var z0 = this.getZ0();
    return this.w = z0 <= this.grid.waterLevel ? this.grid.waterLevel - z0 + 1 : 0;
  }

  //grid point Z value, with added water level.
  gridPoint.getZ = function(){
    if ( typeof(this.z) == 'number' ) return this.z;
    
    var z0 = this.getZ0();
    return this.z = z0 <= this.grid.waterLevel ? this.grid.waterLevel : z0;
  }
  
//  gridPoint.setX = gridPoint.setY = gridPoint.setZ = gridPoint.normalize = function(){
//    console.log(arguments.callee.caller.toString());
//    throw "Can't change gridpoint intance values";
//  }

  return gridPoint;
});


