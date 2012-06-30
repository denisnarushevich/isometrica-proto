define(['layers/tileLayer', 'layers/objectLayer'], function(tileLayer, objectLayer){

  return {
    at: [0, 0],
    size: [0, 0],
    tiles: tileLayer,
    objects: objectLayer,
    init: function(width, height){
      this.size = [width, height];
      
      this.tiles.init();
      this.objects.init();
		
      this.fill();
    },
    coordinatesTransform: function(x, y, z){
      var angle = Math.PI / -4;
      
      x = (x - this.at[0]) * g.world.grid.spacing[0];
      y = (y - this.at[1]) * g.world.grid.spacing[1];
      z *= g.world.grid.spacing[2];
      
      return [
        1 + x * Math.cos(angle) - y * Math.sin(angle) + this.size[0] / 2 | 0,
        1 - ( x * Math.sin(angle) + y * Math.cos(angle) - this.size[1] ) / 2 - z | 0
      ];
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
      this.tiles.drawLayer();
      this.objects.drawLayer();
		
      g.graphics.render.renderLayers();
    }
  }
});