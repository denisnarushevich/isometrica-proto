define(['./vector2'], function(vec2){
  return {
    position: null,
    init: function(){
      this.position = new vec2(252, 1027);
    },
    getPosition: function(){
      return this.position;
    }
  };
});