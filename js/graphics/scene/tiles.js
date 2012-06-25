define(['world', 'graphics/scene/tileSprite'], function(world, tileSprite){
  return {
    items: [],
    updatedItems: [],
    init: function(){
      g.render.createLayer('tiles', this.size);
    },
    fill: function(){
      var tile, offset, scene = g.scene, world = g.world, at = [scene.at[0] | 0, scene.at[1] |0];

      this.items = [];
			
      for(var end, level = 0; !end; level++){
        end = true;
        for(var x = at[0] - level; x <= at[0] + level; x++){
          for(var y = at[1] - level; y <= at[1] + level; y++){
            if ( (x > at[0] - level && x < at[0] + level) && (y > at[1] - level && y < at[1] + level) ) continue; //skpping tiles of previous levels
            
            var tile = world.tiles.getTile(x, y);
            var tileSprite = Object.create(tileSprite).setTile(tile).setOffset(g.scene.coordinatesTransform(x, y, tile.getZ()));
            
            offset = tile.sprite.getOffset();
            //check rect intersection of tile image and window
           if (offset[0] > scene.size[0] || offset[0]+tile.sprite.size[0] < 0 || offset[1] > scene.size[1] || offset[1]+tile.sprite.size[1] < 0) continue;

            this.items.push(tile);

            end = false;
          }
        }
      }
		
      //sorting by depth, where depth is y screen offset coordinate.
      this.items.sort(function(item1, item2){
        return item1.getSprite().getOffset()[1] > item2.getSprite().getOffset()[1] ? -1 : 1;
      });

      this.updatedItems = this.items.slice(); //copying array.
    },
    update: function(){
      for(var key in this.items){
        var item = this.items[key];

        if(item.updated){
          this.updatedItems.push(item);
        }
      }
    },
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
    },
    getTileOffset: function(x, y, z){
      var screenOffset = g.scene.coordinatesTransform(x, y, z);
      screenOffset[0] -= this.tileSpriteSize[0] / 2;
      screenOffset[1] -= this.tileSpriteSize[1] / 2 | 0;
      
      return screenOffset;
    },*/
    drawLayer: function(){
      var item;
      while(item = this.updatedItems.pop()){
        g.render.drawSprite('tiles', item.sprite);
      }
    }
  }
});