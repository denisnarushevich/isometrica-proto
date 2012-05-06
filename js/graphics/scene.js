define(['world', 'config'], function(){

  return g.scene ? g.scene : g.scene = {
    at: [0, 0],
    size: [0, 0],
    tiles: {
      items: [],
      updatedItems: [],
      fill: function(){
        var tile, offset, scene = g.scene, tileSpriteSize = g.config.tileSpriteSize, world = g.world, at = [Math.floor(scene.at[0]), Math.floor(scene.at[1])];
			
        this.items = [];
			
        var depthHash = {}, depth;
			
        for(var end, level = 0; !end; level++){
          end = true;
          for(var x = at[0] - level; x <= at[0] + level; x++){
            for(var y = at[1] - level; y <= at[1] + level; y++){
              if ( (x > at[0] - level && x < at[0] + level) && (y > at[1] - level && y < at[1] + level) ) continue; //skpping tiles of previous levels
						
              tile = world.getTile(x, y);
						
              offset = this.getTileOffset(x, y, tile.z);

              //check rect intersection of tile image and window
              if (offset[0] > scene.size[0] || offset[0]+tileSpriteSize[0] < 0 || offset[1] > scene.size[1] || offset[1]+tileSpriteSize[1] < 0) continue;

              this.items.push({
                object: tile,
                offset: offset,
                sprites: tile.getSprites()
              });

              end = false;
            }
          }
        }
		
        //sorting by depth, where depth is y screen offset coordinate.
        this.items.sort(function(item1, item2){
          return item1.offset[1] > item2.offset[1] ? -1 : 1;
        });

        this.updatedItems = this.items.slice(); //copying array.
      },
      update: function(){
        for(var key in this.items){
          var item = this.items[key];

          if(item.object.updated){
            this.updatedItems.push(item);
          }
        }
      },
      getPart: function(x0, y0, x1, y1){
        if (x0 == 0 && y0 == 0 && x1 == g.scene.size[0] && y1 == g.scene.size[1]) return this.items;

        var tileSpriteSize = g.config.tileSpriteSize;
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
        var tileSpriteSize = g.config.tileSpriteSize;
        return [
        Math.round(( (x - g.scene.at[0]) * tileSpriteSize[0] + (y - g.scene.at[1]) * tileSpriteSize[0] + g.scene.size[0] - tileSpriteSize[0] ) / 2), //xPixel = dX + dY + centeringOnScreen - spriteHalfWidth
        Math.round(( (x - g.scene.at[0]) * tileSpriteSize[0] / 2 - (y - g.scene.at[1]) * tileSpriteSize[0] / 2 + g.scene.size[1] - (tileSpriteSize[1] + 1) ) / 2  - tileSpriteSize[2] * z) //yPixel = dX - dY + dZ + centeringBy0 - elevationSpace&halfHeight - elevation
        ];
      }
    },
    objects: {
      items: [],
      updatedItems: [],
      fill: function(){
        this.items = [];
        var tiles = g.scene.tiles.items;
      
        for(var key in tiles){
          var tile = tiles[key].object;
          var items = tile.getObjects();
          var offset = tiles[key].offset.slice();
        
          for(var index in items){
            var item = items[index];
          
            this.items.push({
              object: item,
              offset: offset,
              sprites: [item.getSprite()]
            });          
          }
        }

        this.updatedItems = this.items.slice(); //copying array.
      }
    },
    init: function(width, height){
      this.size = [width, height];
		
      g.render.createLayer('tiles', this.size);
      g.render.createLayer('objects', this.size);
		
      this.fill();
    },
    fill: function(){
      this.tiles.fill();
      this.objects.fill();
    },
    update: function(){
      this.fill();
      this.tiles.update();
    },
    setAt: function(at){
      this.at = at;
    },
    drawScene: function(){
      var item;
      while(item = this.tiles.updatedItems.pop()){
        //item = this.tiles.updatedItems.pop()
        g.render.drawSprites('tiles', item.sprites, item.offset[0], item.offset[1]);
      }
		
      	g.render.clearLayer('objects');
      		while(item = this.objects.updatedItems.pop()){
      			g.render.drawSprites('objects', item.sprites, item.offset[0], item.offset[1]);
      		}
		
      g.render.renderLayers();
    }
  }
});