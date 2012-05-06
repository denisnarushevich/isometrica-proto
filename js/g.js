define(['sprites', 'controls', 'graphics'], function(){
  g.init = function(){
    this.sprites.load(function(){
      if(g.sprites.loaded()){
        g.controls.init();
        g.graphics.init();
				
        g.loop();
      }
    });
  };
    
  g.loop = function(){
    g.scene.update();
    g.scene.drawScene();
		
    window.requestAnimFrame(function(){ //at moment of testing this was a bit slower then setInterval, but hope requestAnimation will get optimized in future
      g.loop();
    });
  }
});