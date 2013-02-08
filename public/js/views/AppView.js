define([
  'jquery',
  'underscore',
  'backbone',
  'collections/Videos',
  'views/list/VideoList',
  'swipeview',
  'router',
  'views/ModalView',
  'models/video',
  'views/HeaderView',
  'models/channel'

], function ($, _, Backbone, Videos, VideoList, SwipeView, AppRouter, ModalView, VideoModel, HeaderView, ChannelModel){
	
	return Backbone.View.extend({

		initialize:function(){
			
			_.bindAll(this, 'defaultPath', 'getChannel', 'getVideo');

			this.appRouter = new AppRouter();
			this.appRouter.on('route:getVideo', this.getVideo);
			this.appRouter.on('route:getChannel', this.getChannel);
			this.appRouter.on('route:default', this.defaultPath);
			Backbone.history.start({pushState:false});
		},

		defaultPath:function(){
			this.appRouter.navigate('channel/videogames', {trigger:true});
		},

		getChannel:function(hash){
			
			var $mainContainer = $('#slider-container');

			//empty container
			$mainContainer.empty();
			if(this.header) this.header.$el.remove();

			//append header list
			var headerModel = new ChannelModel({
				channel:hash,
				page:1,
				total_pages:100
			});
			this.header = new HeaderView({
				model:headerModel
			});
			$mainContainer.before(this.header.render().$el);

			//initialize swipe view : add dom els
			var slider = new SwipeView('#slider-container', {
				numberOfPages: 100,
				hastyPageFlip: true
			});

			//create 3 view and 3 pages container
			var pages = [];
			for (var i = 0; i < 3; i++) {
				
				$('<div class="row-fluid page" data-page="'+(i+1)+'"></div>')
				.appendTo($mainContainer);

				pages.push(new VideoList({
					collection:new Videos({channel:hash})
				}));
			}

			//for each page, populate collection with paging
			_.each(pages, function (value, i){
				var $container = $('div.page').eq(i);
				var $swipePage = $('#swipeview-masterpage-'+i);
				value.collection.goTo(i+1 , {
					success:function(data){
						//update header total pages, limit is 100...
						//so no need to update it...
						//headerModel.set('total_pages', data.totalPages);
						$container.append(value.el).appendTo($swipePage);
					}
				});
			});

			//listen to slider flip, & load upcoming pages
			slider.onFlip(function (){
				
				//update current page
				headerModel.set('page', slider.pageIndex+1);
				
				//request api
				for (i=0; i<3; i++) {
					upcoming = slider.masterPages[i].dataset.upcomingPageIndex;
					if (upcoming != slider.masterPages[i].dataset.pageIndex) {
						var index = parseInt(upcoming, 10)+2 <= 100 ? parseInt(upcoming, 10)+2 : 1;
						pages[i].collection.goTo(index);

					}
				}
			});

		},

		getVideo:function(hash){
			
			//request api and push infos about single video
			var url = 'https://api.dailymotion.com/video/'+hash+'?fields=title,embed_url';
			var video = new VideoModel();
			video.url = url;
			
			//create the view
			var modalView = new ModalView({
				model:video
			});

			//fetch the model
			modalView.model.fetch();

			//launch bootstrap modal
			$('#video-modal').modal();

		}
		
	});

});