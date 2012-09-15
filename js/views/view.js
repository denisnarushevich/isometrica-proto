define(function(){
  return {
    template: null,
    init: function(){
      return this;
    },
    render: function(rootNode){
      while ( rootNode.firstChild )
        rootNode.removeChild( rootNode.firstChild );
      
      rootNode.appendChild(this.getTemplate());
      
      return this;
    },
    getTemplate: function(){
      return this.template;
    }
  }
});