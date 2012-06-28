define(['simplex'], function(Simplex){
  return {
    x: null,
    y: null,
    z: null,
    region: null,
    init: function(x, y){
      this.x = x;
      this.y = y;
      return this;
    },
    getX: function(){
      return this.x;
    },
    getY: function(){
      return this.y;
    },
    
    //get point of grid, with set height. slopes of terrain shouldnt exceed 45 degrees.
    //This realisation is using many octaves, to have realistic view of terrain contour, coastline.
    //but because at the same time we need it to have smooth slopec <45Deg, there's a drawback - its too flat
    //height varies only from -16 to 16. can't afford anymore, because then there will be cliffs.
    //it would be good to invent something better then this aproach, with smooth slopes  and different landscape
    getZ: function(v){
      var x = this.x;
      var y = this.y;
      
      if ( typeof(this.z) == 'number' ) return this.z;
      else if ( typeof(x) != 'number' || typeof(y) != 'number' ) return this.z = null;
      else if ( x % 1  || y % 1 ) {
        var grid = g.world.grid;
       var p = [];
       var x0 = Math.floor(x), y0 = Math.floor(y);
       p[0] = [x0, y0];
       p[1] = [x0, y0+1];
       p[2] = [x0+1, y0];
       p[3] = [x0+1, y0+1];
       
       var p1 = grid.getGridPoint(p[0][0], p[0][1]).getZ();
       var p2 = grid.getGridPoint(p[1][0], p[1][1]).getZ();
       var p3 = grid.getGridPoint(p[2][0], p[2][1]).getZ();
       var p4 = grid.getGridPoint(p[3][0], p[3][1]).getZ();
 
       var xf = Math.abs(x % 1);
       var yf = Math.abs(y % 1);
       
       var i, i1,i2; //linear interpol
       
       i1 = p1 * (1-xf) + p3 * xf;1
       i2 = p2 * (1-xf) + p4 * xf;
      
      if(y<0)
         i = i2 * (1-yf) + i1 * yf; 
       else
          i = i1 * (1-yf) + i2 * yf; 
       
       return i;
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

        return this.z = Math.floor( (0.8*land + 0.2*island) * 16 );
      }
    },
    setX: function(x){
      this.x = x;
      return this;
    },
    setY: function(y){
      this.y = y;
      return this;
    }
  }; 
});


