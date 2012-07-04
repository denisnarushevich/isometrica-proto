define(['point'], function(point){
  var viewport = {};
  
  viewport.init = function(){
    viewport.size = Object.create(point).setCoordinates({x: 0, y: 0});
    viewport.at = Object.create(point).setCoordinates({x: 0, y: 0});
  }
  
});


