define(['./view'], function (Parent) {
    var View = function () {
        Parent.call(this);
    }

    View.prototype = Object.create(Parent.prototype);

    View.prototype.getTemplate = function () {
        if (this.template) return this.template;

        var loaderView = document.createElement('div');
        var progressBar = loaderView.appendChild(document.createElement('div')).appendChild(document.createElement('div'));
        progressBar.appendChild(document.createElement('div')).className = 'bar';
        progressBar.appendChild(document.createElement('div')).className = 'text';
        progressBar.className = 'progressBar';
        loaderView.id = 'loaderView';

        return this.template = loaderView;
    };

    View.prototype.setProgress = function (progress) {
        $('.bar', this.getTemplate)[0].style.width = (progress * 100) + '%'
    };

    View.prototype.setText = function (text) {
        $('.text', this.getTemplate()).text(text);
    };

    return View;
});