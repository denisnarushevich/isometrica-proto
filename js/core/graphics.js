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

  graphics.renderFrame = function(){ //32-40ms @ 1920x1080
    var tiles = scene.getTiles();
    var objects = scene.getObjects();
    var layers = this.layers;
    //--runs in 8ms until this point.

    for(var i = 0; tiles[i]; i++) //15-20ms
      renderer.drawSprite(layers.tiles, tiles[i]); //tile layer

    renderer.clearLayer(layers.objects); //0ms

    for(var i = 0; objects[i]; i++) //~5ms
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