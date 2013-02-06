require.config({
  
  baseUrl:'js/',
  
  paths: {
    jquery: 'libs/jquery/jquery.min',
    underscore: 'libs/underscore/index',
    backbone: 'libs/backbone/index',
    text: 'libs/text/index',
    paginator:'libs/backbone.paginator/index',
    bootstrap:'libs/bootstrap/bootstrap',
    quo:'libs/quo/quo.debug',
    tweenmax:'libs/tweenmax/TweenMax.min'
    

  },
  
  shim: {
    backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    },
    quo:{
        exports:'$$'
    },
    underscore: {
        exports: '_'
    },
    tweenmax:{
        exports:'TweenMax'
    },
    paginator : ['underscore', 'backbone'],
    bootstrap : ['jquery']
  }

});

require(['app'], function(){
  
});