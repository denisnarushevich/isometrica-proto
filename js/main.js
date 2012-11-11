require.config({
    paths:{
        "caat":"./lib/caat/caat-min",
        "jquery":"./lib/jquery/jquery-1.7.1.min",
        'core':'./core',
        'lib':'./lib'
    }
});

//simple time testing		
function test(subject, n) {
    var t = new Date();
    if (!n)n = 10000;
    for (var i = 0; i < n; i++) {
        subject(i);
    }
    console.log((new Date()) - t);
    console.log(((new Date()) - t) / n);
}

function takeTime(globalName, subject) {
    var t = new Date();
    var r = subject.call(this);
    var t2 = (new Date()) - t;
    window[globalName] ? window[globalName] = (window[globalName] + t2) / 2 : window[globalName] = t2;
    return r;
}

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

require(['./core/resources', './loader', 'core/g', './views/gView'], function (Assets, Loader, Isometrica, gView) {
    $(function () { //waiting for DOM to be ready.
        var isometricaRootNode = document.getElementById('isometricaRoot');
        var assets = new Assets();
        var loader = new Loader(isometricaRootNode, assets);

        loader.loadResources(function () {
            (new gView()).render(isometricaRootNode);
            window.isometrica = new Isometrica(mainViewport, assets);
        });

    });
});


