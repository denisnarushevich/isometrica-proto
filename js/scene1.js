define(['layers/tileLayer', 'layers/objectLayer'], function(tileLayer, objectLayer){
  return {
    at: null,
    size: null,
    layers: null,
    init: function(width, height){
      this.setSize(width, height);
      
      this.setAt(g.logic.player.getPosition().getCoordinates());
      
      this.layers = [
        Object.create(tileLayer).init(this),
        Object.create(objectLayer).init(this),
      ];
		
      this.fill();
    },
    fill: function(){
      this.setAt(g.logic.player.getPosition().getCoordinates());
      for(var i in this.layers){
        this.layers[i].fill();
      }
    },
    setAt: function(at){
      this.at = at;
    },
    drawScene: function(){
      for(var i in this.layers){
        this.layers[i].drawLayer();
      }
    },
    setSize: function(width, height){
      this.size = [width, height];
      return this;
    }
  }
});