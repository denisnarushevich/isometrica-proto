define(function(){
  return {
    layers: {},
    screen: null,
    init: function(width, height){
      //define main canvas
      if (!this.screen) this.screen = document.body.appendChild(document.createElement('canvas')).getContext('2d');
      this.setSize(width, height);
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
    drawSprite: function(layer, sprite){
      var ctx = this.layers[layer];
      var images = sprite.getImages();
      
      for(var i in images){
        //if($.browser.webkit) ctx.setAlpha(sprites[i].opacity);
        ctx.drawImage(images[i], sprite.getOriginOffset()[0], sprite.getOriginOffset()[1]);
      }
    },
    renderLayers: function(){
      for(var key in this.layers){
        this.screen.drawImage(this.layers[key].canvas, 0, 0);
      }
    },
    setSize: function(width, height){
      this.screen.canvas.width = width;
      this.screen.canvas.height = height;
      
      for(var key in this.layers){
        var layer = this.layers[key];
        layer.canvas.width = width;
        layer.canvas.height = height;
      }
      
      return this;
    }
  }

});