define(['vector2'], function(point){
  return {
    position: null,
    init: function(){
      this.position = Object.create(point).setX(270).setY(1000);
    },
    getPosition: function(){
      return this.position;
    }
  };
});