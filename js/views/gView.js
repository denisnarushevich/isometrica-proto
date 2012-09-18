define(['./view'], function(parent){
  var view = Object.create(parent);
  
  view.init = function(){
    parent.init.call(this);
    return this;
  };
  
  view.getTemplate = function(){
    if ( this.template ) return this.template;
    
   var gameView = document.createElement('div');
   gameView.appendChild(document.createElement('div')).id = 'viewport';
   gameView.id = 'game';
   
   return this.template = gameView;
  };
  
  return view;
});