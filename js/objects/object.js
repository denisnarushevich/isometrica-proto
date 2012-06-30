define(function(sprite){
  return object = {
    x: null,
    y: null,
    z: null,
    name: null,
    type: null,
    sprite: null,
    init: function(){
      return this;
    },
    getX: function(){
      return this.x;
    },
    getY: function(){
      return this.y;
    },
    getZ: function(){
      if ( this.z ) return this.z;
      return this.z = g.world.grid.getGridPoint(this.x, this.y).getZ();
    },
    getName: function(){
      return this.name;
    },
    getType: function(){
      return this.type;
    },
    getTile: function(){
      return g.world.getTile(this.x | 0, this.y | 0);
    },
    getSprite: function(){
      return this.sprite;
    },
    setX: function(x){
      this.x = x;
      return this;
    },
    setY: function(y){
      this.y = y;
      return this;
    },
    setXY: function(xy){
      this.x = xy[0];
      this.y = xy[1];
      return this;
    },
    setName: function(name){
      this.name = name;
      return this;
    },
    setType: function(typeName){
      this.type = typeName;
      return this;
    }
  }
});