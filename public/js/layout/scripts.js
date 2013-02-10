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

			obj.dd.hammer({
					prevent_default: false
				}).on('tap', function(event){
					$(this).toggleClass('active');
					event.stopPropagation();
			});

			obj.opts.hammer({
					prevent_default: false
				}).on('tap', function(event){
					var opt = $(this);
					obj.val = opt.text();
					obj.index = opt.index();
					obj.placeholder.text('' + obj.val);
			});
		}
	};

	/* EMPTY MODAL WHEN HIDDEN */
	$('#video-modal').on('hide', function (e){
		$(this).empty();
	});

	//listen for ddl rendering
	$(window).on('ddReady', function (e, param) {
		var dd = new DropDown( $('#filters') );
		$('.option-set li a[data-option-value="'+param+'"]').toggleClass('selected');
	});

	//manage tap events for all video items, waiting for item rendering
	$(document).on('itemComplete', function (e, tooltip, needTooltip){
		tooltip.on('click', function (e) {
			e.preventDefault();			
		});
		if(needTooltip){
			tooltip.hammer().on('tap', function (e){
				$('a[data-role="tooltip"]').not($(this)).tooltip('hide');
				$(this).next().hasClass('in') ? $(this).tooltip('hide') : $(this).tooltip('show');
			});
		}
	});



});