define(['grid', 'tiles', 'objects'], function(grid, tiles, objects){
  return {
    tiles: tiles,
    grid: grid,
    init: function(){
      tiles.init();
      grid.init();
    },
    update: function(){
      this.tiles.update();
      //this.objects.update();
    }
  }
});