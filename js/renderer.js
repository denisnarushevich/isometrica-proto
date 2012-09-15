define(function(){
  return {
    container: null,
    layers: {},
    screen: null,
    init: function(container){
      this.container = container;
      this.screen = container.appendChild(document.createElement('canvas')).getContext('2d');
      this.screen.canvas.style.cssText = 'width: 100%; height: 100%;';
      this.updateSize();
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
    setSize: function(size){
      this.screen.canvas.width = size[0];
      this.screen.canvas.height = size[1];
      
      for(var key in this.layers){
        var layer = this.layers[key];
        layer.canvas.width = size[0];
        layer.canvas.height = size[1];
      }
      
      return this;
    },
    updateSize: function(){
        this.setSize([this.container.clientWidth, this.container.clientHeight]);
        return this;
    }
  }

});