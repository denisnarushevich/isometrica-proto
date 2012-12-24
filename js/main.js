require.config({
    baseUrl:"./js",
    paths:{
        //dirs
        "templates":"../templates",
        "controllers":"./controllers",
        "collections":"./collections",
        "views":"./views",
        "models":"./models",
        lib:"./libs",
        "libs":"./libs",
        utils:'./utils',

        //libs
        "jquery":"libs/jquery/jquery-1.8.3.min",
        "underscore":"libs/underscore/underscore-1.4.2",
        "backbone":"libs/backbone/backbone-0.9.2",
        "ich":"libs/icanhaz/ICanHaz_with_requirejs_fix",

        "caat":"libs/caat/caat-0.5-build-47",

        //plugins
        "text":"libs/requirejs/plugins/text" //text plugin of require js.
    },
    shim:{
        'backbone':{
            //These script dependencies should be loaded before loading
            //backbone.js
            deps:['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports:'Backbone'
        },
        'photon':{
            exports:'PhotonPeer'
        },
        'underscore':{
            exports:'_'
        },
        'caat':{
            exports:'CAAT'
        }
    }
});

require([
    'utils/utils',
    'jquery',
    'underscore',
    'backbone',
    'ich',
], function (Utils, Jquery, Underscore, Backbone, ich) {

    //Define globals
    window.Utils = Utils;
    window.$ = Jquery;
    window.Backbone = Backbone;
    window._ = Underscore;

    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    require(['./app'], function (app) {
        window.isometrica = app;
        app.main();
    });
});


