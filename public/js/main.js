require.config({
  
  baseUrl:'js/',
  
  paths: {
    jquery: 'libs/jquery/jquery.min',
    underscore: 'libs/underscore/index',
    backbone: 'libs/backbone/index',
    text: 'libs/text/index',
    paginator:'libs/backbone.paginator/index',
    bootstrap:'libs/bootstrap/bootstrap',
    tweenmax:'libs/tweenmax/TweenMax.min',
    swipeview:'libs/cubiq/swipeview',
    layout:'layout/scripts'    

  },
  
  shim: {
    backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    },
    underscore: {
        exports: '_'
    },
    tweenmax:{
        exports:'TweenMax'
    },
    layout:['jquery'],
    swipeview:{
        exports:'SwipeView'
    },
    paginator : ['underscore', 'backbone'],
    bootstrap : ['jquery']
  }

});

require(['app'], function(){
  
});