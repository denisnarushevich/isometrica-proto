define(['controls', 'graphics', 'images'], function(controls, graphics, images){
  g.init = function(){
    //console.log('Loading...');
    images.load(function(){
      if(g.images.loaded()){
        g.controls.init();
        g.graphics.init();
				
        g.loop();
      }else{
        //console.log(Math.round(g.images.loadProgress() * 100) + '%');
      }
    });
  };
    
  g.loop = function(){
    g.graphics.scene.update();
    g.graphics.scene.drawScene();
		
    window.requestAnimFrame(function(){ //at moment of testing this was a bit slower then setInterval, but hope requestAnimation will get optimized in future
      g.loop();
    });
  }
});