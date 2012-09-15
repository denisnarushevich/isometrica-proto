define(['./view'], function(parent){
  var view = Object.create(parent);
  
  view.init = function(){
    parent.init.call(this);
    return this;
  };
  
  view.getTemplate = function(){
    if ( this.template ) return this.template;
    
    var loaderView = document.createElement('div');
    var progressBar = loaderView.appendChild(document.createElement('div')).appendChild(document.createElement('div'));
    progressBar.appendChild(document.createElement('div')).className = 'bar';
    progressBar.appendChild(document.createElement('div')).className = 'text';
    progressBar.className = 'progressBar';
    loaderView.id = 'loader';
    
    return this.template = loaderView;
  };
    
  view.setProgress = function(progress){
    $('.bar', this.getTemplate)[0].style.width = (progress * 100) + '%'
  };
    
  view.setText = function(text){
    $('.text', this.getTemplate()).text(text);  
  };
  
  return view;
});