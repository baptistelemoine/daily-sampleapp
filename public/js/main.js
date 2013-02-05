require.config({
  
  baseUrl:'js/',
  
  paths: {
    jquery: 'libs/jquery/jquery.min',
    underscore: 'libs/underscore/index',
    backbone: 'libs/backbone/index',
    text: 'libs/text/index',
    paginator:'libs/backbone.paginator/index',
    bootstrap:'libs/bootstrap/bootstrap'

  },
  
  shim: {
    backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
    },
    underscore: {
        exports: '_'
    },
    paginator : ['underscore', 'backbone'],
    bootstrap : ['jquery']
  }
});

require(['app'], function(){
  
});