define(['world', 'sprites/objectSprite'], function(world, objectSprite){
  return {
    items: [],
    vehicles: [],
    updatedItems: [],
    init: function(){
      g.graphics.render.createLayer('objects', this.size);
    },
    fill: function(){
      var scene = g.graphics.scene, tiles = scene.tiles.items;
      
      this.items = [];
      
      for(var key in tiles){
        var tile = tiles[key];
        var objects = tile.getObjects();
        
        for(var index in objects){
          var object = objects[index];
          var sprite = object.getSprite().setOffset(scene.coordinatesTransform(object.getX(), object.getY(), object.getZ()));
          this.items.push(object);          
        }
      }
      
      for(var key in this.vehicles){
        var vehicle = this.vehicles[key];
        var sprite = vehicle.getSprite().setOffset(scene.coordinatesTransform(vehicle.getX(), vehicle.getY(), vehicle.getZ()));
        this.items.push(vehicle);
      }
      
      this.updatedItems = this.items.slice(); //copying array.
    },
    drawLayer: function(){
      var sprite;
      g.graphics.render.clearLayer('objects');
      while(sprite = this.updatedItems.pop()){
        g.graphics.render.drawSprite('objects', sprite.getSprite());
      }
    }
  }
});