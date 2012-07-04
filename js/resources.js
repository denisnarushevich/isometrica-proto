define(['images'], function(images){
  return g.resources ? g.resources : g.resources = {
    images: images,
    load: function(progressHandler, callback){
      images.load(function(){
        if ( !images.loaded() ) progressHandler(images.loadProgress());
        else callback();
      });
    },
    getImage: function(urn){
      return this.images.getImage(urn);
    }
  };
});