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
    jqHammerSpecial:'libs/hammer/jquery.specialevent.hammer'

  },
  
  shim: {
    backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    },
    underscore: {
        exports: '_'
    },
    layout:['jquery', 'jqHammerSpecial'],
    swipeview:{
        exports:'SwipeView'
    },
    jqHammerSpecial:['jquery', 'hammer'],
    paginator : ['underscore', 'backbone'],
    bootstrap : ['jquery']
  }

});

require(['app'], function(){
  
});