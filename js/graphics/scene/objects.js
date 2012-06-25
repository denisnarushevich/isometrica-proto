define(['world', 'graphics/scene/objectSprite'], function(world, objectSprite){
  return {
    items: [],
    updatedItems: [],
    init: function(){
      g.render.createLayer('objects', this.size);
    },
    fill: function(){
      this.items = [];
      var tiles = g.scene.tiles.items;
      
      for(var key in tiles){
        var tile = tiles[key].getTile();
        var items = tile.getObjects();
        //var offset = tiles[key].offset.slice();
        
        for(var index in items){
          var object = items[index];
          var sprite = object.getSprite().setObject(object).setOffset(g.scene.coordinatesTransform(object.getX(), object.getY(), object.getZ()));
          this.items.push(sprite);          
        }
      }

      this.updatedItems = this.items.slice(); //copying array.
    },
    drawLayer: function(){
      var sprite;
      g.render.clearLayer('objects');
      while(sprite = this.updatedItems.pop()){
        g.render.drawSprite('objects', sprite);
      }
    }
  }
});