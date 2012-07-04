define(['point'], function(point){
  return {
    position: null,
    init: function(){
      this.position = Object.create(point).setCoordinates({x: 270, y: 1000});
    },
    getPosition: function(){
      return this.position;
    }
  };
});