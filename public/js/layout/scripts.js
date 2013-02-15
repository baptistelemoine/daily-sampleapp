jQuery(document).ready(function($) {

	/* FILTERS DROP DOWN MENU */
	function DropDown(el) {
			this.dd = el;
			this.opts = this.dd.find('ul.option-set > li');
			this.placeholder = this.dd.children('span');
			this.val = [];
			this.index = [];
			this.initEvents();
	}

	DropDown.prototype = {
		initEvents : function() {
			var obj = this;

			obj.dd.on('tap', function(event){
					$(this).toggleClass('active');
					event.stopPropagation();
			});

			obj.opts.on('tap', function(event){
					var opt = $(this);
					obj.val = opt.text();
					obj.index = opt.index();
					//obj.placeholder.text('' + obj.val);
					obj.opts.removeClass('selected');
					opt.addClass('selected');
					// obj.dd.removeClass('active');
			});
		}
	};

	var dd = new DropDown( $('#filters') );
	//update current channel, for the first load
	var hash = document.location.hash.split('/')[1];
	var items = $('#filters').find('ul.option-set > li');
		$('a', items).each(function (value){
		if($(this).data('option-value') === hash)
			$(this).parent().addClass('selected');
	});

	/* EMPTY MODAL WHEN HIDDEN */
	$('#video-modal').on('hide', function (e){
		$(this).empty();
	});
	
	//menu tab bar
	$('#menu-bar i').on('tap', function (e, param){

		var index = $('#menu-bar i').index($(this));
		Tab.init(index);
		$('div.menu-content').hide();
		$('div.menu-content').eq(index).show();
		
	});
	
	var Tab = {
		
		$tabContainer:$('#menu-bar'),
		$icons:$('#menu-bar i'),
		isOpen:false,
		index:0,
		init:function(index){
			this.index = index;
			this.openClose();
		},
		openClose:function(){
			//if no one icon is active or this one is...
			if(this.$icons.eq(this.index).hasClass('active-icon') || !this.$icons.hasClass('active-icon')){
				this.isOpen ? this.$tabContainer.css('left','-360px') : this.$tabContainer.css('left',0);
				this.isOpen =! this.isOpen;
			}
			this.layout();
			
		},
		layout:function(){
			var self = this;
			this.$icons.each(function (i){
				self.$icons.eq(i).removeClass();
				switch(i){
					case 0:self.$icons.eq(i).addClass('icon-search');
						break;
					case 1:self.$icons.eq(i).addClass('icon-user');
						break;
					case 2:self.$icons.eq(i).addClass('icon-info');
						break;
					case 3:self.$icons.eq(i).addClass('icon-twitter');
						break;
				}
			});
			if(this.isOpen) self.$icons.eq(self.index).removeClass().addClass('icon-cancel active-icon');
		}
	};

	$('#search_videos').on('click', function (e) {e.preventDefault();});
	//try click if don't close
	$('#search_videos').on('tap', function (e){
		var keyword = $('#input_videos').val();
		if(keyword !== '') {
			Tab.openClose();
			$('#input_videos').val('');
			document.location.href = "#search/"+keyword;
		}
	});

	$('#search_user').on('click', function (e) {e.preventDefault();});
	//try click if don't close
	$('#search_user').on('tap', function (e){
		var user = $('#input_user').val();
		if(user !== '') {
			Tab.openClose();
			$('#input_user').val('');
			document.location.href = "#user/"+user;
		}
	});

});