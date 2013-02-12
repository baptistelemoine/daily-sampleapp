define([
    'jquery',
    'underscore',
    'backbone'
    ], function ($, _, Backbone) {

    return Backbone.Collection.extend({
        
        initialize:function(options) {
           
        },

        url:'http://api.twitter.com/1/statuses/user_timeline.json?callback=?'

    });

});