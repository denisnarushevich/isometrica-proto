define(['simplex'], function(Simplex){
  return {
    x: null,
    y: null,
    z: null,
    region: null,
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
    getZ: function(){
      var x = this.x;
      var y = this.y;
      
      if ( typeof(x) != 'number' || typeof(y) != 'number' ) return this.z = null;
      
      if ( typeof(this.z) == 'number' ) return this.z;
      else {
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

        return this.z = (0.8*land + 0.2*island) * 16;
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


