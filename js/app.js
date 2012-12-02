define([
    'controllers/loader',
    'controllers/game'
],function(Loader, Game){
   var app = {
        rootNode: null
   };

    app.main = function(){
        //init rootNode where all views will be appended.
        this.rootNode = document.getElementById('isometricaRoot');

        //show loader screen
        var loader = new Loader();
        loader.renderView(app.rootNode);

        //init game
        var game = new Game(loader.assets);

        loader.loadAssets(function(assets){
            //once loaded, launch game
            game.renderView(app.rootNode);
            game.start();
        });
    };

   return app;
});