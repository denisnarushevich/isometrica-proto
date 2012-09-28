define(['../objects', '../sprites/tileSprite'], function(objects, sprite){
  
  var tile = function(gridPoints, tiles){
    this.tiles = tiles;
    this.sprite =  new sprite(this);
    this.gridPoints = gridPoints;
  };
  
  tile.prototype = {
    _LAND: 1,
    _WATER: 2,
    _SHORE: 3,
    _ROAD: 4,
    tiles: null,
    gridPoints: null,
    objects: null,
    slopeId: null,
    sprite: null,
    terrain: null,
    type: null,
  
  update: function(){
    var objects = this.getObjects();
    for(var i in objects){
      objects[i].update();
    }
    return this;
  },
  
  getGridPoints: function(){
    return this.gridPoints;
  },
  
  getObjects: function(){
    if (this.objects) return this.objects;

    return this.objects = [];
  },
  
  
  getSlopeId: function(){
    if ( this.slopeId ) return this.slopeId;
		
    var gridPoints = this.getGridPoints();
    return this.slopeId = 2000 + (gridPoints[1].getZ() - gridPoints[0].getZ() + 2) * 100 + (gridPoints[2].getZ() - gridPoints[0].getZ() + 2) * 10 + (gridPoints[3].getZ() - gridPoints[0].getZ() + 2);
  },
  
  getSprite: function(){
    return this.sprite;
  },
  
  getTerrain: function(){
    return this.terrain;
  },
  
  getType: function(){
    return this.type;
  },
  
  getPosition: function(){
    return this.gridPoints[0];
  },
  
  addObject: function(object){
    this.getObjects().push(object);
    return this;
  },
  
  removeObject: function(object){
    for(var key in this.objects){
      var otherObject = this.objects[key];
      if(otherObject == object){
        delete this.objects[key];
          
        //filling empty place with some other object, from same array
        if(otherObject = this.objects.pop())
          this.objects[key] = otherObject;
          
        break;
      }
    }
    return this;
  },
  
  spawnObject: function(prototypeName){
    var object = new objects[prototypeName](this);
    this.objects.push(object);
    return object;
  }
  };
  
  return tile;
});