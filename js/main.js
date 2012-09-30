require.config({
  paths: {
    "jquery": "./lib/jquery/jquery-1.7.1.min",
    'core': './core',
    'lib': './lib'
  }
});

//simple time testing		
function test(subject,n){
  var t = new Date();
  if(!n)n = 10000;
  for(var i = 0; i < n; i++){
    subject(i);
  }
  console.log( (new Date())-t );
  console.log( ((new Date())-t)/n );
}

function takeTime(globalName, subject){
  var t = new Date();
  var r = subject.call(this);
  var t2 = (new Date())-t;
  window[globalName] ? window[globalName] = (window[globalName] + t2)/2 : window[globalName] = t2;
  return r;
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

require(['./loader', 'core/g', './views/gView'], function(loader, g, gView){
  window.g = g;
  $(function(){ //waiting for DOM to be ready.
    var root = document.body;
    loader.init(root, g.resources);
    loader.loadResources(function(){
      gView.render(root);
      g.init(document.getElementById('viewport'));
    });
  });
});


