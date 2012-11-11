define(['./view'], function (Parent) {
    var View = function () {
        Parent.call(this);
    }

    View.prototype = Object.create(Parent.prototype);


    View.prototype.getTemplate = function () {
        if (this.template) return this.template;

        var gameView = document.createElement('div');
        gameView.appendChild(document.createElement('div')).id = 'mainViewport';
        gameView.id = 'gameView';

        return this.template = gameView;
    };

    return View;
});