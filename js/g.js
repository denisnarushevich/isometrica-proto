define(['controls', 'graphics', 'logic', 'resources'], function(controls, graphics, logic, resources){
  g.init = function(){
    resources.load(function(progress){
      console.log(Math.round(progress * 100) + '%');
    }, function(){
      console.log('100%');
      
      logic.init();
      graphics.init();
      controls.init();
      
      g.loop();
    });
  };
    
  g.loop = function(){
    logic.update();
    graphics.drawFrame();
		
    window.requestAnimFrame(function(){
      g.loop();
    });
  }
});