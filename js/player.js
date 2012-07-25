define(['vector2'], function(point){
  return {
    position: null,
    init: function(){
      this.position = Object.create(point).setX(252).setY(1027);
    },
    getPosition: function(){
      return this.position;
    }
  };
});