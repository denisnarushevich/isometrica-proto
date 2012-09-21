define(['./scene', './renderer', './logic'], function(scene, renderer, logic){
  
  var graphics = {
    layers: {}
  };
  
  graphics.init = function(viewportBox){
    renderer.init(viewportBox);

    this.layers.tiles = renderer.createLayer('tiles');
    this.layers.objects = renderer.createLayer('objects');
      
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
    
  graphics.renderFrame = function(){ //40ms @ 1920x1080
    var tiles = scene.getTiles(); // if disabled +12fps // 20ms should optimise
    var objects = scene.getObjects(); // if disabled +3fps //4ms
    var layers = this.layers;
      
    for(var i = 0; tiles[i]; i++)
      renderer.drawSprite(layers.tiles, tiles[i]); //tile layer
    
    renderer.clearLayer(layers.objects); //0ms
    
    for(var i = 0; objects[i]; i++)
      renderer.drawSprite(layers.objects, objects[i]); //object layer

    renderer.renderLayers(); //0-1ms
  };
  
  
  graphics.renderFrames = function(){
    this.renderFrame();
	
    window.requestAnimFrame(function(){
      graphics.renderFrames();
    });
  }

  
  return graphics;
});