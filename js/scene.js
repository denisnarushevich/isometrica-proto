define(function(){
  return {
    init: function(size, at){
      this.size = size;
      this.at = at;
    },
    getTiles: function(){
      this.tiles = [];
      
      var tiles = g.logic.world.tiles, at = [Math.floor(this.at.getX()), Math.floor(this.at.getY())];
      
      for(var end, level = 0; !end; level++){
        end = true;
        for(var x = at[0] - level; x <= at[0] + level; x++){
          for(var y = at[1] - level; y <= at[1] + level; y++){
            if ( x > at[0] - level && x < at[0] + level && y > at[1] - level && y < at[1] + level ) continue; //skiping tiles of previous levels
            
            var tile = tiles.getTile(x, y);
            var sprite = tile.getSprite().setOffset(g.graphics.coordinatesTransform(x, y, tile.getPosition().getZ()));
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
    },
    getObjects: function(){
      this.objects = [];
      
      for(var i in this.tiles){
        var tile = this.tiles[i].getModel();
        var objects = tile.getObjects();
        for(var key in objects){
          var object = objects[key];
          var sprite = object.getSprite().setOffset(g.graphics.coordinatesTransform(object.getPosition().getX(), object.getPosition().getY(), object.getPosition().getZ()));
          //console.log(sprite);throw 1;
          this.objects.push(sprite);
        }
      };
      
      //sorting by depth, where depth is y screen offset coordinate.
      this.objects.sort(function(obj1, obj2){
        return obj1.getOffset()[1] > obj2.getOffset()[1] ? -1 : 1;
      });
      
      return this.objects;
    },
    setSize: function(size){
      this.size = size;
      return this;
    }
  }
});