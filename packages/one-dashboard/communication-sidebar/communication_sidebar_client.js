Template.communicationSidebar.rendered = function () {
  // Set height on sidebar for scrollbar
  var currentHeight = $( window ).height();
  $( '.communication-sidebar-sleeve' ).css( 'height', currentHeight - 120 );
  // add/remove sticky class on sidebar based on scroll position
  var $sidebar = $( '#communication-sidebar' );
  var sidebarWidth = $sidebar.width();
  var stickyHeight = 400;
  $( '#transitioner-1' ).on( 'scroll', function() {         
    var scrollPosition = $( '#transitioner-1' ).scrollTop();
    if ( scrollPosition > stickyHeight ) { 
      $sidebar.addClass( 'sticky' );  
      $sidebar.css( "width", sidebarWidth );
    }else {
      $sidebar.removeClass( 'sticky' );  
      $sidebar.css( "width", "auto" );
    }
  }); 
};

Template.communicationSidebar.helpers({

	// Presentation logic
	communicationFilter: function(){
		var filter = Session.get('filter').filter;
		if( filter === 'all' ){
			return {
				all: true,
				company: false,
				direct: false,
				rooms: false,
        drafts: false
			};
		}else if( filter === 'company' ){
			return {
				all: false,
				company: true,
				direct: false,
				rooms: false,
        drafts: false
			};
		}else if( filter === 'direct' ){
			return {
				all: false,
				company: false,
				direct: true,
				rooms: false,
        drafts: false
			};
		}else if( filter === 'rooms' ){
      return {
        all: false,
        company: false,
        direct: false,
        rooms: true,
        drafts: false
      };
    }else if( filter === 'drafts' ){
			return {
				all: false,
				company: false,
				direct: false,
				rooms: false,
        drafts: true
			};
		}
	}

});

Template.communicationSidebar.events({

	// Scroll to top when communication sidebar is clicked, to appear full screen
	'click #communication-sidebar-options': function(){
    $( "#transitioner-1" ).animate( { scrollTop: 400 } );
		// $('#main-wrap').addClass('blurry');
	},

	// Opens the Communication Hub
	'click .channel': function(event){
    Session.set('openRoomId', $(event.currentTarget).data('id'));
    Session.set('messageLimit',20);
		// expands the main dialog box to 80% of full screen
    $.Velocity.hook($('#communication-main'), "overflow", "visible");
		$.Velocity.hook($('#communication-main'), "width", "76%");
		$.Velocity.hook($('#communication-message-board'), "width", "78%");
		$.Velocity.hook($('#communication-task-board'), "width", "0%");
		$.Velocity.hook($('#communication-library-board'), "width", "22%");
		// remove class from main chat window
		$('#communication-main').removeClass('tasks');

	  // lock scroll position, but retain settings for later
    var scrollPosition = [
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft,
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    ];
    var body = $('body');
    body.data('scroll-position', scrollPosition);
    body.data('previous-overflow', body.css('overflow'));
    body.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

	},

	'click .room': function(event){
    Session.set('openRoomId', $(event.currentTarget).data('id'));
    Session.set('messageLimit',20);
		// expands the main dialog box t0 60% of full screen
    $.Velocity.hook($('#communication-main'), "overflow", "visible");
		$.Velocity.hook($('#communication-main'), "width", "76%");
		$.Velocity.hook($('#communication-message-board'), "width", "56%");
		$.Velocity.hook($('#communication-task-board'), "width", "22%");
		$.Velocity.hook($('#communication-library-board'), "width", "22%");
		// add class to main chat window
		$('#communication-main').addClass('tasks');

		// lock scroll position, but retain settings for later
    var scrollPosition = [
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft,
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    ];
    var body = $('body');
    body.data('scroll-position', scrollPosition);
    body.data('previous-overflow', body.css('overflow'));
    body.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

	},
  'click #addRoom': function() {
    Session.set('teamModalPurpose','newTeam');
  },
  'click #addDM': function() {
    Session.set('teamModalPurpose','newDM');
  }

});











