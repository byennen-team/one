Template.libraryBoard.rendered = function () {
	Session.setDefault('members', true);
	$('#communication-library-board .top-btn').removeClass('active');
	$('#communication-library-members-btn').addClass('active');
} 

Template.libraryBoard.helpers({

	// True if session members is true
	libraryCard: function(){
		var members = Session.get('members');
		if( members ){
			return true;
		}else {
			return false;
		}
	}

});

Template.libraryBoard.events({

	// Sets library session to true and toggles classes
	'click #communication-library-members-btn': function(){
		Session.set('members', true);
		$('#communication-library-board .top-btn').removeClass('active');
		$('#communication-library-members-btn').addClass('active');
	},

	// Sets library session to false and toggles classes
	'click #communication-library-files-btn': function(){
		Session.set('members', false);
		$('#communication-library-board .top-btn').removeClass('active');
		$('#communication-library-files-btn').addClass('active');
	},

		// closes the Communication Hub
	'click #communication-library-close': function(){
		// expands the main dialog box to 80% of full screen
		$.Velocity.hook($('#communication-main'), "width", "0");
		$.Velocity.hook($('#communication-message-board'), "width", "0");
		$.Velocity.hook($('#communication-task-board'), "width", "0"); 
		$.Velocity.hook($('#communication-library-board'), "width", "0");
		// force scrollbar on sidebar
		var currentHeight = $(window).height();
		$('.communication-sidebar-sleeve').css({
			'height': 'inherit',
			'position': 'static',
			'top': '130px',
			'width': '100%'
		});
    // un-lock scroll position
    var body = jQuery('body');
    var scrollPosition = body.data('scroll-position');
    body.css('overflow', body.data('previous-overflow'));
    window.scrollTo(scrollPosition[0], scrollPosition[1])
	}

});

