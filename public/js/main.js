require.config({
  
  baseUrl:'js/',
  
  paths: {
    jquery: 'libs/jquery/jquery.min',
    underscore: 'libs/underscore/index',
    backbone: 'libs/backbone/index',
    text: 'libs/text/index',
    paginator:'libs/backbone.paginator/index',
    bootstrap:'libs/bootstrap/bootstrap',
    swipeview:'libs/cubiq/swipeview',
    layout:'layout/scripts',
    hammer:'libs/hammer/hammer',
    jqHammer:'libs/hammer/jquery.hammer'

  },
  
  shim: {
    backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    },
    underscore: {
        exports: '_'
    },
    layout:['jquery', 'jqHammer'],
    swipeview:{
        exports:'SwipeView'
    },
    jqHammer:['jquery', 'hammer'],
    paginator : ['underscore', 'backbone'],
    bootstrap : ['jquery']
  }

});

require(['app'], function(){
  
});