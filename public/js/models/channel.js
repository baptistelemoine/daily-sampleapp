define([
    'backbone'
    ], function (Backbone) {

    return Backbone.Model.extend({
		defaults:{
			'channel_name':'',
			'total_pages':''
		}
    });

});