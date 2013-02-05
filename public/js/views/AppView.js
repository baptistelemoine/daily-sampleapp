define([
  'jquery',
  'underscore',
  'backbone',
  'collections/Videos',
  'views/list/VideoList'

], function ($, _, Backbone, Videos, VideoList){
	
	return Backbone.View.extend({
		
		initialize:function(){

			var videos = new VideoList({
				collection:new Videos({channel:'music', fields:['status', 'tags']})
			});

			videos.collection.pager({
				success:function(data){
					console.log(data);
				}
			});

			$('div[data-view="videos-list"]').append(videos.el);

		}
		
	});

});