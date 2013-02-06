define([
  'jquery',
  'quo',
  'underscore',
  'backbone',
  'collections/Videos',
  'views/list/VideoList',
  'tweenmax'

], function ($, $$, _, Backbone, Videos, VideoList, TweenMax){
	
	return Backbone.View.extend({
		
		initialize:function(){

			var videos = new VideoList({
				collection:new Videos({channel:'news', fields:['status', 'tags']})
			});

			videos.collection.pager({
				success:function(data){
					//console.log(data);
				}
			});

			var videos2 = new VideoList({
				collection:new Videos({channel:'music', fields:['status', 'tags']})
			});

			videos2.collection.pager({
				success:function(data){
					//console.log(data);
				}
			});

			var videos3 = new VideoList({
				collection:new Videos({channel:'fun', fields:['status', 'tags']})
			});

			videos3.collection.pager({
				success:function(data){
					//console.log(data);
				}
			});

			$('div[data-page="1"]').append(videos.el);
			$('div[data-page="2"]').append(videos2.el);
			$('div[data-page="3"]').append(videos3.el);

			
			var pageWidth = $('#slider-container').width() / 3;
			var currentPos = -pageWidth;
			var currentPage = 0;

			TweenMax.to($('#slider-container'), 0, {x:-pageWidth});

			$$('#slider-container').on('swiping', function (e){
				var t = e.iniTouch.x - e.currentTouch.x;
				TweenMax.to(this, 0, {x:currentPos-t});
			});

			$$('#slider-container').on('swipeLeft', function (e){

				if(e.iniTouch.x - e.currentTouch.x > 200) {
					
					currentPos -= pageWidth;

					TweenMax.to(this, 0.5, {x:currentPos, onComplete:function(){
						$('div[data-page]:last-child').after($('div[data-page]:first-child'));
						TweenMax.to($('#slider-container'), 0, {x:-pageWidth});
						currentPos = -pageWidth;
						currentPage++;
					}});
				}
				else TweenMax.to(this, 0.5, {x:currentPos});
				
			});

			$$('#slider-container').on('swipeRight', function (e){

				if(e.iniTouch.x - e.currentTouch.x < -200) {
					
					currentPos += pageWidth;

					TweenMax.to(this, 0.5, {x:currentPos, onComplete:function(){
						$('div[data-page]:first-child').before($('div[data-page]:last-child'));
						TweenMax.to($('#slider-container'), 0, {x:-pageWidth});
						currentPos = -pageWidth;
						currentPage--;
					}});
				}
				else TweenMax.to(this, 0.5, {x:currentPos});
			});

		}
		
	});

});