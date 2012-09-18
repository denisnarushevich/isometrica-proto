define(['./tiles', './grid'], function(tiles, grid){
  var scene = {};
  
  scene.init = function(viewport, at){
    this.viewport = viewport;
    this.at = at;
    this.updateSize();
  };
    
  scene.getTiles = function(){
    this.tiles = [];
      
    var at = [Math.floor(this.at.getX()), Math.floor(this.at.getY())];
      
    for(var end, level = 0; !end; level++){
      end = true;
      for(var x = at[0] - level; x <= at[0] + level; x++){
        for(var y = at[1] - level; y <= at[1] + level; y++){
          if ( x > at[0] - level && x < at[0] + level && y > at[1] - level && y < at[1] + level ) continue; //skiping tiles of previous levels
            
          var tile = tiles.getTile(x, y);
          var sprite = tile.getSprite().setOffset(this.coordinatesTransform(x, y, tile.getPosition().getZ()));
          var offset = sprite.getOriginOffset();
            
          //check rect intersection of tile image and window
          if (offset[0] > this.size[0] || offset[0]+sprite.size[0] < 0 || offset[1] > this.size[1] || offset[1]+sprite.size[1] < 0) continue;

          this.tiles.push(sprite);
          end = false;
        }
      }
    }
	
    //sorting by depth, where depth is y screen offset coordinate.
    this.tiles.sort(function(tile1, tile2){
      return tile1.getOriginOffset()[1] > tile2.getOriginOffset()[1] ? -1 : 1;
    });
      
    return this.tiles;
  };
    
  scene.getObjects = function(){
    this.objects = [];
      
    for(var i in this.tiles){
      var tile = this.tiles[i].getModel();
      var objects = tile.getObjects();
      for(var key in objects){
        var object = objects[key];
        var sprite = object.getSprite().setOffset(this.coordinatesTransform(object.getPosition().getX(), object.getPosition().getY(), object.getPosition().getZ()));
        //console.log(sprite);throw 1;
        this.objects.push(sprite);
      }
    };
      
    //sorting by depth, where depth is y screen offset coordinate.
    this.objects.sort(function(obj1, obj2){
      return obj1.getOffset()[1] > obj2.getOffset()[1] ? -1 : 1;
    });
      
    return this.objects;
  };
    
  scene.updateSize = function(){
    this.size = [this.viewport.clientWidth, this.viewport.clientHeight];
  };
  
  scene.coordinatesTransform = function(x, y, z){
    var angle = Math.PI / -4;
      
    x = (x - this.at.x) * grid.spacing[0];
    y = (y - this.at.y) * grid.spacing[1];
    z *= grid.spacing[2];

    return [
    1 + x * Math.cos(angle) - y * Math.sin(angle) + this.size[0] / 2 | 0,
    1 - ( x * Math.sin(angle) + y * Math.cos(angle) - this.size[1] ) / 2 - z | 0
    ];
  }
  
  return scene;
});