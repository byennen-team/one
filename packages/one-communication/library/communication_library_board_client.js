
Template.libraryBoard.rendered = function () {
	Session.setDefault('members', true);
	$('#communication-library-board .top-btn').removeClass('active');
	$('#communication-library-members-btn').addClass('active');
};

Template.libraryBoard.helpers({

	// True if session members is true. Keeps track of which panel is visible.
	libraryCard: function(){
		var members = Session.get('members');
		if( members ){
			return 'true';
		}else {
			return false;
		}
	},

	membersActive: function() {
		var members = Session.get('members');
		if( members ){
			return 'active';
		}
	},

	filesActive: function() {
		var members = Session.get('members');
		if( ! members ){
			return 'active';
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

	// pops the comm in a new window
	'click #communication-library-popout': function(){
		window.open("comm/" + Session.get("openRoomId"),"_blank",
			"height= 1024, width= 1280, menubar= 0, status= 0, toolbar= 0");
	},

		// closes the Communication Hub
	'click #communication-library-close': function(){

		// expands the main dialog box to 80% of full screen
		$.Velocity.hook($('#communication-main'), "overflow", "hidden");
		$.Velocity.hook($('#communication-main'), "width", "0");
		$.Velocity.hook($('#communication-message-board'), "width", "0");
		$.Velocity.hook($('#communication-task-board'), "width", "0");
		$.Velocity.hook($('#communication-library-board'), "width", "0");

    // un-lock scroll position
    var body = $('body');
    if( body.data('scroll-position') ){
      var scrollPosition = body.data('scroll-position');
      body.css('overflow', body.data('previous-overflow'));
      window.scrollTo(scrollPosition[0], scrollPosition[1]);
    }
	}

});

