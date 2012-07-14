define(['./tile'], function(tile){
  var road = Object.create(tile);
  
  road.type = 'road';
  road.shape = 0; // straight = 0, t-crossing = 1, x-crossing = 2, turn = 3
  road.placing = 0; //0 = not rotated
});