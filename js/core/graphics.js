define(['./scene', './renderer', './logic'], function(scene, renderer, logic){
  
  var graphics = {};
  
  graphics.init = function(viewportBox){
    renderer.init(viewportBox);

    renderer.createLayer('tiles');
    renderer.createLayer('objects');
      
    scene.init(viewportBox, logic.player.getPosition());
    
    //on window resize, we update size of canvases
    window.onresize = function(){
      graphics.resize();
    }
  };
    
  graphics.resize = function(){
    renderer.updateSize();
    scene.updateSize();
  };
    
  graphics.renderFrame = function(){
    var tiles = scene.getTiles();
    var objects = scene.getObjects();
      
    while(tiles.length){
      renderer.drawSprite('tiles', tiles.pop());
    }
      
    renderer.clearLayer('objects');
      
    while(objects.length){
      renderer.drawSprite('objects', objects.pop());
    }
      
    renderer.renderLayers();
  };
  
  
  graphics.renderFrames = function(){
    graphics.renderFrame();
	
    window.requestAnimFrame(function(){
      graphics.renderFrames();
    });
  }

  
  return graphics;
});