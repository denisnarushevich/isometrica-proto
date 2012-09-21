define(function(){
  return {
    originOffset: null,
    size: null,
    origin: null,
    images: null,
    model: null,
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
    setOriginOffset: function(offset){
      this.originOffset = offset;
      return this;
    },
    getOriginOffset: function(){
      return this.originOffset;
    },
    getOffset: function(){
      return [
        this.originOffset[0] - this.origin[0],
        this.originOffset[1] - this.origin[1]
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
    },
    
    //test
    getCanvas: function(){
      if(this.canvas)return this.canvas;
      var images = this.getImages();
      var cnv = document.createElement('canvas');
      cnv.width = this.getSize()[0];
      cnv.height = this.getSize()[1];
      var ctx = cnv.getContext('2d');
      for(var i in images){
        ctx.drawImage(images[i], 0, 0);
      }
      return this.canvas = cnv;
    },
    getPixels: function(){
      if(this.pixelArray)return this.pixelArray;
      return this.getCanvas().getContext('2d').getImageData(0,0,this.getSize()[0],this.getSize()[1]);
    }
  }
});