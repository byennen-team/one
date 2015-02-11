// TODO: make this helper global
Template.navbar.helpers({
  activeForRoute: function (routeName) {
    return Routes.getName() === routeName ? 'active' : '';
  }
});


Template.navbar.events({

	// closes the Communication Hub
	'click #navbar-logo': function () {
		// expands the main dialog box to 80% of full screen
		$.Velocity.hook($('#communication-main'), "width", "0");
		$.Velocity.hook($('#communication-message-board'), "width", "0");
		$.Velocity.hook($('#communication-task-board'), "width", "0");
		$.Velocity.hook($('#communication-library-board'), "width", "0");
		// force scrollbar on sidebar
		$('.communication-sidebar-sleeve').css({
			'height': 'inherit',
			'position': 'static',
			'top': '120px',
			'width': '100%'
		});
    // un-lock scroll position
    var body = $('body');
    var scrollPosition = body.data('scroll-position');
    body.css('overflow', body.data('previous-overflow'));
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
	},

  'click #navbar-link-task': function () {
    // expands the main dialog box t0 60% of full screen - task bar open
    $( "#transitioner-1" ).animate( { scrollTop: 400 } );
    $.Velocity.hook($('#communication-main'), "width", "100%");
    $.Velocity.hook($('#communication-message-board'), "width", "45%");
    $.Velocity.hook($('#communication-task-board'), "width", "15%");
    $.Velocity.hook($('#communication-library-board'), "width", "15.75%");
    // opens task menu itself
    Session.set( 'taskMenu', true );
    $( '#communication-task-menu' ).velocity( "fadeIn", { duration: 300 });
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
  }

});
