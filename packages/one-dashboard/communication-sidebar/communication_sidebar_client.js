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
				rooms: false
			};
		}else if( filter === 'company' ){
			return {
				all: false,
				company: true,
				direct: false,
				rooms: false
			};
		}else if( filter === 'direct' ){
			return {
				all: false,
				company: false,
				direct: true,
				rooms: false
			};
		}else if( filter === 'rooms' ){
			return {
				all: false,
				company: false,
				direct: false,
				rooms: true
			};
		}
	}

});

Template.communicationSidebar.events({

	// Scroll to top when communication sidebar is clicked, to appear full screen
	'click #communication-sidebar-options': function(){
  // Velocity.js is unable to scroll a specific div to a point
    $( "#transitioner-1" ).animate( { scrollTop: 400 } );

		// $('#main-wrap').addClass('blurry');
	},

	// Opens the Communication Hub
	'click .channel': function(){
		// expands the main dialog box to 80% of full screen
		$.Velocity.hook($('#communication-main'), "width", "100%");
		$.Velocity.hook($('#communication-message-board'), "width", "60%");
		$.Velocity.hook($('#communication-task-board'), "width", "0%");
		$.Velocity.hook($('#communication-library-board'), "width", "15.75%");
		// remove class from main chat window
		$('#communication-main').removeClass('tasks');
		// force scrollbar on sidebar
    var currentHeight = $(window).height();
    var $sleeve = $('.communication-sidebar-sleeve');
    $sleeve.css( 'position', 'fixed' );
    $sleeve.velocity( {
      height: currentHeight - 130,
      top: 120,
      width: '24%'
    });

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

    $("#communication-message-board-sleeve")
      .mCustomScrollbar({
        theme:"one-dark",
        scrollbarPosition: "inside"
    });
	},

	'click .room': function(event){
    Session.set('openRoomId', $(event.currentTarget).data('id'));
		// expands the main dialog box t0 60% of full screen
		$.Velocity.hook($('#communication-main'), "width", "100%");
		$.Velocity.hook($('#communication-message-board'), "width", "45%");
		$.Velocity.hook($('#communication-task-board'), "width", "15%");
		$.Velocity.hook($('#communication-library-board'), "width", "15.75%");
		// add class to main chat window
		$('#communication-main').addClass('tasks');
    // force scrollbar on sidebar
    var currentHeight = $(window).height();
    var $sleeve = $('.communication-sidebar-sleeve');
    $sleeve.css( 'position', 'fixed' );
    $sleeve.velocity( {
      height: currentHeight - 130,
      top: 120,
      width: '24%'
    });

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

    $("#communication-message-board-sleeve")
      .mCustomScrollbar({
        theme:"one-dark",
        scrollbarPosition: "inside"
    });
	},
  'click #addRoom': function() {
    Session.set('teamModalPurpose','newTeam');
  }

});











