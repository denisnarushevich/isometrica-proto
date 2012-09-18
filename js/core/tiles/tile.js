define(['lib/simplex/simplex', '../objects', '../sprites/tileSprite'], function(simplex, objects, tileSprite){
  var tile = {
    tiles: null,
    gridPoints: null,
    objects: null,
    slopeId: null,
    sprite: null,
    terrain: null,
    type: null
  };
  
  tile.init = function(gridPoints, tiles){
    this.tiles = tiles;
    this.sprite = Object.create(tileSprite).setModel(this);
    this.gridPoints = gridPoints;      
    return this;
  };
  
  tile.update = function(){
    var objects = this.getObjects();
    for(var i in objects){
      objects[i].update();
    }
    return this;
  };
  
  tile.getGridPoints = function(){
    return this.gridPoints;
  };
  
  tile.getObjects = function(){
    if (this.objects) return this.objects;

    return this.objects = [];
  };
  
  
  tile.getSlopeId = function(){
    if ( this.slopeId ) return this.slopeId;
		
    var gridPoints = this.getGridPoints();
    return this.slopeId = 2000 + (gridPoints[1].getZ() - gridPoints[0].getZ() + 2) * 100 + (gridPoints[2].getZ() - gridPoints[0].getZ() + 2) * 10 + (gridPoints[3].getZ() - gridPoints[0].getZ() + 2);
  };
  
  tile.getSprite = function(){
    return this.sprite;
  };
  
  tile.getTerrain = function(){
    return this.terrain;
  };
  
  tile.getType = function(){
    return this.type;
  };
  
  tile.getPosition = function(){
    return this.gridPoints[0];
  };
  
  tile.addObject = function(object){
    this.getObjects().push(object);
    return this;
  };
  
  tile.removeObject = function(object){
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
  };
  
  tile.spawnObject = function(prototypeName){
    var object = Object.create(objects[prototypeName]).init(this);
    this.objects.push(object);
    return object;
  };
  
  return tile;
});