define(function(){
  return object = {
    x: null,
    y: null,
    name: null,
    type: null,
    getX: function(){
      return this.x;
    },
    getY: function(){
      return this.y;
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
      return g.sprites.getSprite('objects/'+this.type+'/'+this.name);
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