define(['world', 'player'], function(world, player){
  return g.logic ? g.logic : g.logic = {
    world: world,
    player: player,
    init: function(){
      this.world.init();
      this.player.init();
    },
    update: function(){
      this.world.update();
      
    }
  };
});