define([
  'jquery',
  'underscore',
  'backbone',
  'collections/videos',
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
			
			_.bindAll(this, 'defaultPath', 'getChannel', 'getVideo', 'getSearch');

			this.appRouter = new AppRouter();
			this.appRouter.on('route:getVideo', this.getVideo);
			this.appRouter.on('route:getChannel', this.getChannel);
			this.appRouter.on('route:getSearch', this.getSearch);
			this.appRouter.on('route:default', this.defaultPath);
			Backbone.history.start({pushState:false});

		},

		defaultPath:function(){
			this.appRouter.navigate('channel/videogames', {trigger:true});
		},

		getSearch:function(keyword){
			// var url = 'https.dailymotion.'
			for (var i = 0; i < 3; i++) {
				console.log(this.pages[i]);
			}
		},

		getChannel:function(hash){
			
			var self = this;

			var $mainContainer = $('#slider-container');

			//empty container
			$mainContainer.empty();
			if(this.header) this.header.$el.remove();

			//append header list
			this.headerModel = new ChannelModel({
				channel:hash,
				page:1,
				total_pages:100
			});
			this.header = new HeaderView({
				model:self.headerModel
			});
			$('div[data-role="list-filter"]').before(this.header.render().$el);
			$('#filters').removeClass('active');

			//create 3 view and 3 pages container
			this.pages = [];
			for (var i = 0; i < 3; i++) {
				
				$('<div class="row-fluid page" data-page="'+(i+1)+'"></div>')
				.appendTo($mainContainer);

				this.pages.push(new VideoList({
					collection:new Videos({channel:hash})
				}));
			}

			this.initSwipeView();

			this.historyPrev = Backbone.history.fragment;

		},

		initSwipeView:function(){
			//initialize swipe view : add dom els
			var slider = new SwipeView('#slider-container', {
				numberOfPages: 100,
				hastyPageFlip: true
			});

			//for each page, populate collection with paging
			_.each(this.pages, function (value, i){
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

			var self = this;

			//listen to slider flip, & load upcoming pages
			slider.onFlip(function (){
				//update current page
				self.headerModel.set('page', slider.pageIndex+1);
				//request api
				for (i=0; i<3; i++) {
					upcoming = slider.masterPages[i].dataset.upcomingPageIndex;
					if (upcoming != slider.masterPages[i].dataset.pageIndex) {
						var index = parseInt(upcoming, 10)+2 <= 100 ? parseInt(upcoming, 10)+2 : 1;
						self.pages[i].collection.goTo(index);

					}
				}
			});


		},

		getVideo:function(hash){
			
			//request api and push infos about single video
			var url = 'https://api.dailymotion.com/video/'+hash+'?fields=title,embed_url,description';
			var video = new VideoModel();
			video.url = url;
			
			//create the view
			var modalView = new ModalView({
				model:video
			});

			//fetch the model
			modalView.model.fetch();

			var self = this;
			//launch bootstrap modal
			$('#video-modal').modal();
			$('#video-modal').on('hide', function (e){
				self.appRouter.navigate(self.historyPrev, {trigger:false, replace:true});
			});
		}
		
	});

});