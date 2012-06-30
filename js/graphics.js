define(['scene', 'render'], function(scene, render){

  return g.graphics ? g.graphics : g.graphics = {
    scene: scene,
    render: render,
    init: function(){
      this.setResolution(window.innerWidth, window.innerHeight);
		
      //on window resize, we update size of canvases
      window.onresize = function(){
        g.graphics.setResolution(window.innerWidth, window.innerHeight);
      }
    },
    setResolution: function(width, height){
      this.render.init(width, height);
      this.scene.init(width, height);
    }
  }
});