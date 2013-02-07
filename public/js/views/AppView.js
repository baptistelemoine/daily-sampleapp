define([
  'jquery',
  'underscore',
  'backbone',
  'collections/Videos',
  'views/list/VideoList',
  'tweenmax',
  'swipeview'

], function ($, _, Backbone, Videos, VideoList, TweenMax, SwipeView){
	
	return Backbone.View.extend({
		
		initialize:function(){
			
			var slider = new SwipeView('#slider-container', {
				numberOfPages: 10,
				hastyPageFlip: true
			});

			var pages = [];
			for (var i = 0; i < 3; i++) {
				pages.push(new VideoList({
					collection:new Videos({channel:'news'})
				}));
			}

			_.each(pages, function (value, i){
				var $container = $('div.page').eq(i);
				var $swipePage = $('#swipeview-masterpage-'+i);
				value.collection.goTo(i+1 , {
					success:function(data){
						$container.append(value.el).appendTo($swipePage);
					}
				});
			});
			
			slider.onFlip(function (){

				for (i=0; i<3; i++) {
					upcoming = slider.masterPages[i].dataset.upcomingPageIndex;
					if (upcoming != slider.masterPages[i].dataset.pageIndex) {
						var index = parseInt(upcoming, 10)+2 <= 10 ? parseInt(upcoming, 10)+2 : 1;
						pages[i].collection.goTo(index);

					}
				}
			});
		}
		
	});

});