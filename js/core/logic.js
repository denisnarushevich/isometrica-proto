define(['./world', './player'], function(world, player){
  var logic = {
    world: world,
    player: player
  };
  
  logic.init = function(){
    this.world.init();
    this.player.init();
  };
    
    
  logic.update = function(){
    this.world.update();   
  };
    
  logic.startUpdateLoop = function(){
    setInterval(function(){
      logic.update();
    }, 1000/25);
  };
  
  return logic;
});