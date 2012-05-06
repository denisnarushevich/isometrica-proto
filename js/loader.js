var loader = {
  //scripts: {},
  libDir: 'js/',
  /*use: function(scriptName, callback){
    if (scriptName in this.used) return;
    else this.used[scriptName] = true;
		
    var script = document.head.appendChild(document.createElement('script'));
    script.type = 'text/javascript';
    script.onload = callback ? callback : function(){};
    script.src = this.libDir + scriptName;
  },*//*
  use: function(scriptList, callback){ 
    if (typeof scriptList == "string") {
      var scriptName = scriptList;
      scriptList = [];
    }else{
      if (scriptList.length < 1) return callback ? callback() : null;
      var scriptName = scriptList.shift();
    }
    
    if (!(scriptName in loader.scripts)) {
      var script = document.head.appendChild(document.createElement('script'));
      script.type = 'text/javascript';
      script.onload = function(){
        loader.scripts[scriptName] = true;
        loader.use(scriptList, callback);
      }
      script.src = this.libDir + scriptName;
    } else {
      loader.use(scriptList, callback);
    }
  },*/
  dependencies: {},
  require: function(script, dependencies, callback){
    var ready = true;
    for(var key in dependencies){
      if (loader.dependencies[dependencies[key]]) {
        if (!loader.dependencies[dependencies[key]].ready) {
          loader.dependencies[dependencies[key]].dependants = loader.dependants(dependencies[key]);
          ready = false;
        }
        continue;
      }
      ready = false;
      var scriptElement = document.head.appendChild(document.createElement('script'));
      scriptElement.type = 'text/javascript';
      scriptElement.src = loader.libDir + dependencies[key];
    }  
    
    loader.dependencies[script] = {
      'dependants': loader.dependants(script),
      'dependencies': dependencies,
      'callback': callback,
      'ready': false
    }
      
    if (dependencies.length < 1 || ready) {
      loader.run(script);
    }
  },
  run: function(scriptName){
    loader.dependencies[scriptName].ready = true;
    loader.dependencies[scriptName].callback();
    
    for(var key in loader.dependencies[scriptName].dependants){
      var dependant = loader.dependencies[scriptName].dependants[key];
      
      //checking that all depending of dependants is ready
      for(var kkey in loader.dependencies[dependant].dependencies){
        var dependency = loader.dependencies[dependant].dependencies[kkey];
        if(loader.dependencies[dependency] && !loader.dependencies[dependency].ready) return;
      }
      
      loader.run(dependant);
    }
  },
  dependants: function(scriptName){
    var result = [];
    for(var key in loader.dependencies){
      for(var kkey in loader.dependencies[key].dependencies){
        if(loader.dependencies[key].dependencies[kkey] == scriptName) result.push(key);
      }      
    }
    return result;
  }
}
var require = function(script, dependencies, callback){
  return loader.require(script, dependencies, callback);
};