define(function(){
  return {
    offset: null,
    size: null,
    origin: null,
    images: null,
    model: null,
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
    setModel: function(model){
      this.model = model;
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
    getModel: function(){
      return this.model;
    }
  }
});