Template.communicationSidebar.helpers({

	// Presentation logic
	communicationFilter: function(){
		var filter = Session.get('filter').filter;
		if( filter === 'all' ){
			return {
				all: true,
				company: false,
				direct: false,
				rooms: false 
			}
		}else if( filter === 'company' ){
			return {
				all: false,
				company: true,
				direct: false,
				rooms: false 
			}
		}else if( filter === 'direct' ){
			return {
				all: false,
				company: false,
				direct: true,
				rooms: false 
			}
		}else if( filter === 'rooms' ){
			return {
				all: false,
				company: false,
				direct: false,
				rooms: true 
			}
		}
	}

});

Template.communicationSidebar.events({

	// Scroll to top when communication sidebar is clicked, to appear full screen
	'click #communication-sidebar': function(){
		$('#sidebar-scroll-target').velocity("scroll",600);
		// $('#main-wrap').addClass('blurry');
		$.Velocity.hook($('#communication-main'), "width", "100%");
	},

	// Opens the Communication Hub
	'click .channel': function(){
		// expands the main dialog box to 80% of full screen
		$.Velocity.hook($('#communication-message-board'), "width", "60%");
		$.Velocity.hook($('#communication-task-board'), "width", "0%"); 
		$.Velocity.hook($('#communication-library-board'), "width", "15%");
		// force scrollbar on sidebar
		var currentHeight = $(window).height();
		$('#communication-sidebar-sleeve').css({
			'height': currentHeight - 130 + 'px',
			'position': 'fixed',
			'top': '130px',
			'width': '25%'
		});
		// adjust message board height
		var board = $('#communication-message-board-sleeve');
		board.css('height', currentHeight - 140 + 'px');

	  // lock scroll position, but retain settings for later
    var scrollPosition = [
      self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
      self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
    ];
    var body = jQuery('body'); 
    body.data('scroll-position', scrollPosition);
    body.data('previous-overflow', body.css('overflow'));
    body.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
	},

	'click .room': function(){
		// expands the main dialog box t0 60% of full screen
		$.Velocity.hook($('#communication-message-board'), "width", "45%");
		$.Velocity.hook($('#communication-task-board'), "width", "15%"); 
		$.Velocity.hook($('#communication-library-board'), "width", "15%"); 
		// force scrollbar on sidebar
		var currentHeight = $(window).height();
		$('#communication-sidebar-sleeve').css({
			'height': currentHeight - 130 + 'px',
			'position': 'fixed',
			'top': '130px',
			'width': '25%'
		});
		// adjust message board height
		var board = $('#communication-message-board-sleeve');
		board.css('height', currentHeight - 140 + 'px');
	}

});











