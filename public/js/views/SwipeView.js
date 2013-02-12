define([
    'jquery',
    'underscore',
    'backbone',
    'swipeview',
    'views/list/VideoList'

    ], function ($, _, Backbone, SwipeView, VideoList) {

    return Backbone.View.extend({
        
        slider:null,
        options:null,
        pages:[],
        $mainContainer:$('#slider-container'),
        currentPage:1,

        initialize:function(options) {
          
          _.bindAll(this, 'render');
          this.options = options;

          this.render();
        },

		render:function(){

			//empty all dom els
			this.$mainContainer.empty();

			var self = this;
			//initialize swipe view : add dom els
			this.slider = new SwipeView(self.$mainContainer.selector, {
				numberOfPages: self.options.numPages,
				hastyPageFlip: true
			});

			self.pages =[];
			//create 3 view and 3 pages container
			for (var i = 0; i < 3; i++) {

				$('<div class="row-fluid page" data-page="'+(i+1)+'"></div>')
				.appendTo(self.$mainContainer);
				self.pages.push(new VideoList({
					collection:self.collection.clone()
				}));
			}

			//for each page, populate collection with paging
			_.each(self.pages, function (value, i){
				var $container = $('div.page').eq(i);
				var $swipePage = $('#swipeview-masterpage-'+i);
				value.collection.goTo(i+1 , {
					success:function(data){
						//headerModel.set('total_pages', data.totalPages);
						$container.append(value.$el).appendTo($swipePage);
					}
				});
			});

			//listen for flip event fired
			self.slider.onFlip(function (){
				//update current page
				self.currentPage = self.slider.pageIndex+1;
				//update current page on main view
				self.$el.trigger('pageFlip');
				//request api
				for (i=0; i<3; i++) {
					upcoming = self.slider.masterPages[i].dataset.upcomingPageIndex;
					if (upcoming != self.slider.masterPages[i].dataset.pageIndex) {
						var index = parseInt(upcoming, 10)+2 <= 100 ? parseInt(upcoming, 10)+2 : 1;
						self.pages[i].collection.goTo(index);
					}
				}
			});
		},

		destroy:function(){
			this.slider.destroy();
			this.slider = null;
		}

    });

});