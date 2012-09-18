define(['./views/loaderView'], function(view){
  return {
    init: function(rootNode, resources){
      this.resources = resources;
      view.init();
      view.render(rootNode);
    },
    loadResources: function(callback){
      this.resources.load(function(progress, name){
        view.setProgress(progress);
        view.setText(name)
      }, function(){
        callback();
      });
    }
  }
});