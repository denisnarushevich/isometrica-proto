define(['scene', 'renderer'], function(scene, renderer){

  return g.graphics ? g.graphics : g.graphics = {
    scene: scene,
    renderer: renderer,
    init: function(){
      var width = window.innerWidth;
      var height = window.innerHeight;
      
      this.renderer.init(width, height);
      this.scene.init(width, height);
		
      //on window resize, we update size of canvases
      window.onresize = function(){
        g.graphics.resize(window.innerWidth, window.innerHeight);
      }
    },
    resize: function(width, height){
      this.renderer.setSize(width, height);
      this.scene.setSize(width, height);
    },
    drawFrame: function(){
      scene.fill();
      scene.drawScene();
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