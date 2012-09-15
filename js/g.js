define(['controls', 'graphics', 'logic', 'views/gameView'], function(controls, graphics, logic, view){
   
  g.init = function(rootNode){
      view.init();
      view.render(rootNode);
    
      logic.init();
      graphics.init(rootNode);
      controls.init();

      g.loop();
  };

  g.loop = function(){
    logic.update();
    graphics.drawFrame();
	
    window.requestAnimFrame(function(){
      g.loop();
    });
  };
  
  return g;
});