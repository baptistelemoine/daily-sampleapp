define([
  'jquery',
  'underscore',
  'backbone'

  ], function($, _, Backbone){

  return Backbone.Router.extend({

        routes:{
                
            ''                 : 'default',
            'video/:id'        : 'getVideo',
            'channel/:name'    : 'getChannel',
            'search/:keywords' : 'getSearch'
        }
  	});
});