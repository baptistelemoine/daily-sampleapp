define([
    'backbone'
    ], function (Backbone) {

    return Backbone.Model.extend({
    	defaults:{
    		'owner_name':'',
    		'user':null,
    		'isLast':false
    	}
    });

});