define(['world'], function(world){
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
        var tile = tiles[key];
        var items = tile.getObjects();
        //var offset = tiles[key].offset.slice();
        
        for(var index in items){
          var object = items[index];
          object.sprite.setOffset(g.scene.coordinatesTransform(object.getX(), object.getY(), object.getZ()));
          this.items.push(object);          
        }
      }

      this.updatedItems = this.items.slice(); //copying array.
    },
    drawLayer: function(){
      var item;
      g.render.clearLayer('objects');
      while(item = this.updatedItems.pop()){
        g.render.drawSprite('objects', item.sprite);
      }
    }
  }
});