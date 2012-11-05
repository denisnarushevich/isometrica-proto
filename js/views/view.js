define(function(){
  var View = function(){

  };

  View.prototype.template = null;

  View.prototype.render = function(rootNode){
      while ( rootNode.firstChild )
          rootNode.removeChild( rootNode.firstChild );

      rootNode.appendChild(this.getTemplate());

      return this;
  };

  View.prototype.getTemplate = function(){
      return this.template;
  };

  return View;
});