require.config({
  paths: {
    "jquery": "./jquery-1.7.1.min"
  }
});

//simple time testing		
function test(subject,n){
  var t = new Date();
  if(!n)n = 1000000;
  for(var i = 0; i < n; i++){
    subject(i);
  }
  console.log( (new Date())-t );
  console.log( ((new Date())-t)/n );
}

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame    || 
  window.oRequestAnimationFrame      || 
  window.msRequestAnimationFrame     || 
  function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

require(['loader', 'g', 'views/gView'], function(loader, g, gView){
  $(function(){ //waiting for DOM to be ready.
    var root = document.body;
    loader.init(root, g.resources);
    loader.loadResources(function(){
      gView.render(root);
      g.init(document.getElementById('viewport'));
    });
  });
});


