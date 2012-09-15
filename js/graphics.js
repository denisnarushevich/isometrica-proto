define(['scene', 'renderer'], function(scene, renderer){

  return g.graphics ? g.graphics : g.graphics = {
    scene: scene,
    renderer: renderer,
    init: function(rootNode){
      var viewport = $('#viewport', rootNode)[0];
      
      this.renderer.init(viewport);

      this.renderer.createLayer('tiles');
      this.renderer.createLayer('objects');
      
      this.scene.init(viewport, g.logic.player.getPosition());
		
      //on window resize, we update size of canvases
      window.onresize = function(){
        g.graphics.resize();
      }
    },
    resize: function(){
      this.renderer.updateSize();
      this.scene.updateSize();
    },
    drawFrame: function(){
      var tiles = this.scene.getTiles();
      var objects = this.scene.getObjects();
      
      while(tiles.length){
        this.renderer.drawSprite('tiles', tiles.pop());
      }
      
      renderer.clearLayer('objects');
      
      while(objects.length){
        this.renderer.drawSprite('objects', objects.pop());
      }
      
      renderer.renderLayers();
    },
    coordinatesTransform: function(x, y, z){
      var angle = Math.PI / -4;
      var grid = g.logic.world.grid;
      
      x = (x - this.scene.at.x) * grid.spacing[0];
      y = (y - this.scene.at.y) * grid.spacing[1];
      z *= grid.spacing[2];

      return [
      1 + x * Math.cos(angle) - y * Math.sin(angle) + this.scene.size[0] / 2 | 0,
      1 - ( x * Math.sin(angle) + y * Math.cos(angle) - this.scene.size[1] ) / 2 - z | 0
      ];
    }
  }
});