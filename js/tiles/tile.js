define(['simplex', 'objects', 'sprites/tileSprite'], function(simplex, objects, tileSprite){
  return {
    x: 0,
    y: 0,
    z: 0,
    gridPoints: null,
    slopeId: null,
    shore: null,
    water: null,
    objects: null,
    sprite: null,
    init: function(x, y){
      this.x = x;
      this.y = y;
      this.z = this.isWater() ? g.world.waterLevel : this.getGridPoints()[0];
      return this;
    },
    getX: function(){
      return this.x
    },
    getY: function(){
      return this.y;
    },
    getZ: function(){
      return this.z;
    },
    getGridPoints: function(){
      if (this.gridPoints) return this.gridPoints;
		
      //gridpoints start count from tiles left (West corner);
      return this.gridPoints = [ 
      g.world.grid.getGridPoint(this.x, this.y).getZ(),
      g.world.grid.getGridPoint(this.x, this.y + 1).getZ(),
      g.world.grid.getGridPoint(this.x + 1, this.y + 1).getZ(),
      g.world.grid.getGridPoint(this.x + 1, this.y).getZ()
      ];
    },
    getSlopeId: function(){
      if (this.slopeId) return this.slopeId;
		
      if (this.isWater()) return this.slopeId = 2222;
		
      var gridPoints = this.getGridPoints();
      return this.slopeId = 2000 + (gridPoints[1] - gridPoints[0] + 2) * 100 + (gridPoints[2] - gridPoints[0] + 2) * 10 + (gridPoints[3] - gridPoints[0] + 2);
    },
    isShore: function(){
      if (this.shore != null) return this.shore;
		
      var wLevel = g.world.waterLevel;
      var gridPoints = this.getGridPoints();
		
      return this.shore = ( !this.isWater() && (gridPoints[0] == wLevel || gridPoints[1] == wLevel || gridPoints[2] == wLevel || gridPoints[3] == wLevel) );
    },
    isWater: function(){
      if (this.water != null) return this.water;
		
      var wLevel = g.world.waterLevel;
      var gridPoints = this.getGridPoints();
		
      return this.water = (gridPoints[0] <= wLevel && gridPoints[1] <= wLevel && gridPoints[2] <= wLevel && gridPoints[3] <= wLevel);
    },
    getTerrain: function(){
      if (this.isWater()) {
        if(this.getGridPoints()[0] >= -1) return this.terrain = 'water';
        else return this.terrain = 'deepwater';
      }
      else{
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
      }
    },
    getObjects: function(){
      if (this.objects) return this.objects;
    
      //return generated tree
      var tree = 0, x = this.x, y = this.y;
		
      tree += Simplex.noise2d(x, y);
		
      if(tree > 0 && !this.isWater() && this.getTerrain() == 'grass' && !this.isShore()){
        var obj = objects.create('tree1').setXY([this.getX()+1/2  , this.getY() + 1/2]);
        return this.objects = [obj];
      }
      return this.objects = [];
    },
    getSprite: function(){
      if ( this.sprite ) return this.sprite;
      return this.sprite = Object.create(tileSprite).setTile(this);
    },
    setX: function(x){
      this.x = x;
      return this;
    },
    setY: function(y){
      this.y = y;
      return this;
    },
    setXY: function(xy){
      this.x = xy[0];
      this.y = xy[1];
      return this;
    }
  }
});