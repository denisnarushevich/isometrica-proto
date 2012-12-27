define([
    'controllers/loader/loader',
    'controllers/game/game'
], function (Loader, Game) {
    var app = {
        rootNode:null,
        gameInstance:null,
    };

    app.main = function () {
        //init rootNode where all views will be appended.
        this.rootNode = document.getElementById('isometricaRoot');

        //show loader screen
        var loader = new Loader();
        loader.renderView(app.rootNode);

        //init game
        this.gameInstance = new Game();

        loader.loadAssets(function (assets) {
            //once loaded, launch game
            app.gameInstance.renderView(app.rootNode);
            app.gameInstance.start();
        });
    };

    return app;
});