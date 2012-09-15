define(['views/loaderView', 'resources'], function(view, resources){
  return {
    init: function(rootNode){
      view.init();
      view.render(rootNode);
    },
    loadResources: function(callback){
      resources.load(function(progress, name){
        view.setProgress(progress);
        view.setText(name)
      }, function(){
        callback();
      });
    }
  }
});