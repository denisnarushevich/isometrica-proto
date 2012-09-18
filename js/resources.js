define(['images'], function(images){
  return {
    images: images,
    load: function(progressHandler, callback){
      images.load(function(){
        progressHandler(images.loadProgress(), images.currentLoadingName());
        
        if ( images.loaded() ) callback();
      });
    },
    getImage: function(urn){
      return this.images.getImage(urn);
    }
  };
});