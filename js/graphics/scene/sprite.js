define(function(){
  return {
    offset: null,
    size: null,
    origin: null,
    images: null,
    init: function(size, origin){
      this.size = size;
      this.origin = origin;
      return this;
    },
    setOffset: function(offset){
      this.offset = offset;
      return this;
    },
    setSize: function(size){
      this.size = size;
      return this;
    },
    setOrigin: function(origin){
      this.origin = origin;
      return this;
    },
    setObject: function(object){
      this.object = object;
      return this;
    },
    getOffset: function(){
      return this.offset;
    },
    getOriginOffset: function(){
      return [
        this.offset[0] - this.origin[0],
        this.offset[1] - this.origin[1]
      ];
    },
    getSize: function(){
      return this.size;
    },
    getOrigin: function(){
      return this.origin;
    },
    getImages: function(){
      if(!this.images)this.images = [];
      return this.images;
    },
    getObject: function(){
      return this.object;
    }
  }
});