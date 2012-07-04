define(['world', 'sprites/tileSprite'], function(world, tileSprite){
  return {
    items: [],
    updatedItems: [],
    init: function(scene){
      g.graphics.renderer.createLayer('tiles', this.size);
      this.scene = scene;
      return this;
    },
    fill: function(){
      var scene = this.scene, size = scene.size, tiles = g.logic.world.tiles, at = [scene.at.x | 0, scene.at.y |0];

      this.items = [];
      
      for(var end, level = 0; !end; level++){
        end = true;
        for(var x = at[0] - level; x <= at[0] + level; x++){
          for(var y = at[1] - level; y <= at[1] + level; y++){
            if ( x > at[0] - level && x < at[0] + level && y > at[1] - level && y < at[1] + level ) continue; //skpping tiles of previous levels
            
            var tile = tiles.getTile(x, y);
            var sprite = tile.getSprite().setOffset(g.graphics.coordinatesTransform(x, y, tile.getZ()));
            var offset = sprite.getOriginOffset();
            
            //console.log(tile, sprite); 
            //if(x>3) throw 1;
            //check rect intersection of tile image and window
            if (offset[0] > size[0] || offset[0]+sprite.size[0] < 0 || offset[1] > size[1] || offset[1]+sprite.size[1] < 0) continue;

            this.items.push(tile);

            end = false;
          }
        }
      }
	
      //sorting by depth, where depth is y screen offset coordinate.
      this.items.sort(function(item1, item2){
        return item1.getSprite().getOriginOffset()[1] > item2.getSprite().getOriginOffset()[1] ? -1 : 1;
      });

      this.updatedItems = this.items.slice(); //copying array.
    },
//    update: function(){
//      for(var key in this.items){
//        var item = this.items[key];
//
//        if(item.updated){
//          this.updatedItems.push(item);
//        }
//      }
//    },
    /*
    getPart: function(x0, y0, x1, y1){
      if (x0 == 0 && y0 == 0 && x1 == g.scene.size[0] && y1 == g.scene.size[1]) return this.items;

      var tileSpriteSize = this.tileSpriteSize;
      var items = [];
      for(var key in this.items){
        var item = this.items[key];
        var offsetX = item.offset[0];
        var offsetY = item.offset[1];

        //check rect intersection of tile image and drawPart
        if (offsetX > x1 || (offsetX+tileSpriteSize[0]) < x0 || offsetY > y1 || (offsetY+tileSpriteSize[1]) < y0) continue;

        items.push(item);
      }
      return items;
    },*/
    drawLayer: function(){
      var tile;
      while(tile = this.updatedItems.pop()){
        g.graphics.renderer.drawSprite('tiles', tile.getSprite());
      }
    }
  }
});