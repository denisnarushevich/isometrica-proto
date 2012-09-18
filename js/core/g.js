define(['./controls', './graphics', './logic', './resources'], function(controls, graphics, logic, resources){
  var g = {
    resources: resources,
    logic: logic,
    graphics: graphics,
    controls: controls
  };
  
  g.init = function(viewportBox){
      logic.init();
      graphics.init(viewportBox);
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