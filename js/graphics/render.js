define(['jquery'], function($){

  return g.render ? g.render : g.render = {
    layers: {},
    screen: null,
    init: function(width, height){
      //define main canvas
      if (!this.screen) this.screen = document.body.appendChild(document.createElement('canvas')).getContext('2d');
      this.screen.canvas.width = width;
      this.screen.canvas.height = height;
      this.screen.canvas.style.cssText = 'width: 100%; height: 100%;';
    },
    createLayer: function(name){
      if (!this.layers[name]) this.layers[name] = document.createElement('canvas').getContext('2d');
      this.layers[name].canvas.width = this.screen.canvas.width;
      this.layers[name].canvas.height = this.screen.canvas.height;
      return;
    },
    clearLayer: function(name){
      this.layers[name].clearRect(0, 0, this.layers[name].canvas.width, this.layers[name].canvas.height);
    },
    drawSprites: function(layer, sprites, screenX, screenY){
      var ctx = this.layers[layer];
      for(var i in sprites){
        if($.browser.webkit) ctx.setAlpha(sprites[i].opacity);
        ctx.drawImage(sprites[i].image, screenX, screenY);
      }
    },
    renderLayers: function(){
      for(var key in this.layers){
        this.screen.drawImage(this.layers[key].canvas, 0, 0);
      }
    }
  }

});